'use server'

import { getToken } from './get-token'

export const getArtists = async (ids: string) => {
   try {
      const token = await getToken()
      if (token?.access_token) {
         const response = await fetch(
            `${process.env.BASE_API_URL}/artists?ids=${ids}`,
            { headers: { Authorization: `Bearer ${token.access_token}` } }
         )
         if (!response.ok) throw new Error('Server error')
         const json = await response.json()
         return json
      }
   } catch (error) {}
}
