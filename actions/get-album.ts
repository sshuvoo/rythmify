'use server'

import { getToken } from './get-token'

export const getAlbum = async (album_id: string) => {
   try {
      const token = await getToken()
      if (token?.access_token) {
         const response = await fetch(
            `${process.env.BASE_API_URL}/albums/${album_id}`,
            { headers: { Authorization: `Bearer ${token.access_token}` } }
         )
         if (!response.ok) throw new Error('Server error')
         const json = await response.json()
         return json
      }
   } catch (error) {
      console.log(error)
   }
}
