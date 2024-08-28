'use server'

import { auth } from '@/auth'

export const checkFollowingArtists = async (artist_id: string) => {
   const session = await auth()
   if (!session) return false

   try {
      const response = await fetch(
         `${process.env.BASE_API_URL}/me/following/contains?type=artist&ids=${artist_id}`,
         {
            cache: 'no-store',
            headers: {
               Authorization: `Bearer ${session.token.access_token}`,
            },
         }
      )
      if (!response.ok) throw new Error('Server error')
      const json = await response.json()
      return json[0]
   } catch (error) {
      console.log(error)
      return false
   }
}
