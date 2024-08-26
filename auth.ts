import NextAuth, { DefaultSession } from 'next-auth'
import Spotify from 'next-auth/providers/spotify'

declare module 'next-auth' {
   interface Session extends DefaultSession {
      user: {
         id: string
      } & DefaultSession['user']
      token: {
         access_token: string
         refresh_token: string
      }
   }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [Spotify],
   callbacks: {
      jwt: async ({ account, token, profile }) => {
         if (account && profile) {
            return {
               ...token,
               picture: (profile as any)?.images?.at(-1).url,
               spotify_id: profile.id,
               access_token: account.access_token,
               refresh_token: account.refresh_token,
               expires_at: account.expires_at! * 1000,
            }
         } else if (Date.now() < (token.expires_at as number)) {
            return token
         } else {
            if (!token.refresh_token)
               throw new TypeError('Missing refresh_token')
            try {
               const response = await fetch(
                  'https://accounts.spotify.com/api/token',
                  {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization:
                           'Basic ' +
                           Buffer.from(
                              process.env.AUTH_SPOTIFY_ID +
                                 ':' +
                                 process.env.AUTH_SPOTIFY_SECRET
                           ).toString('base64'),
                     },
                     body: new URLSearchParams({
                        grant_type: 'refresh_token',
                        refresh_token: token.refresh_token as string,
                     }),
                  }
               )
               if (!response.ok) throw new Error('Spotify server error')
               const result = await response.json()
               return {
                  ...token,
                  access_token: result.access_token,
                  refresh_token: result.refresh_token,
                  expires_at: Date.now() + result.expires_in,
               }
            } catch (error) {
               return { ...token, error: 'RefreshAccessTokenError' }
            }
         }
      },
      session: ({ session, token }) => {
         if (session && token) {
            session.user.id = token.spotify_id as string
            session.token = {
               access_token: token.access_token as string,
               refresh_token: token.refresh_token as string,
            }
         }
         return session
      },
   },
})
