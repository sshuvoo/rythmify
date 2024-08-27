'use server'

import { auth } from '@/auth'

export const getTopItems = async (type: 'artists' | 'tracks') => {
   const session = await auth()

   try {
      if (session) {
         const response = await fetch(
            `${process.env.BASE_API_URL}/me/top/${type}`,
            {
               headers: {
                  Authorization: `Bearer ${session.token.access_token}`,
               },
            }
         )
         // if (!response.ok) throw new Error('Server error')
         const json = await response.json()
         console.log(json)
         return json
      }
   } catch (error) {
      console.log(error)
   }
}
