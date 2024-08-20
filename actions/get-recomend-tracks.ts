'use server'

import { getToken } from './get-token'

export const getRecomendTracks = async (
   artist_id: string,
   genres: string[]
) => {
   try {
      const token = await getToken()
      if (token?.access_token) {
         const response = await fetch(
            `${
               process.env.BASE_API_URL
            }/recommendations?limit=10&seed_artists=${artist_id}&seed_genres=${encodeURIComponent(
               genres.join(',')
            )}`,
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
