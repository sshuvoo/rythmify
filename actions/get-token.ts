'use server'

export const getToken = async () => {
   const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
         grant_type: 'client_credentials',
         client_id: process.env.AUTH_SPOTIFY_ID!,
         client_secret: process.env.AUTH_SPOTIFY_SECRET!,
      }),
   })
   const json = await response.json()
   return json
}
