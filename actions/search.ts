'use server'

import { getToken } from './get-token'

export const search = async (q: string, type: string[]) => {
   try {
      const token = await getToken()
      if (token?.access_token) {
         const response = await fetch(
            `${process.env.BASE_API_URL}/search?q=${q}&limit=5&type=${type.join(',')}`,
            {
               headers: { Authorization: `Bearer ${token.access_token}` },
            }
         )
         if (!response.ok) throw new Error('Server error')
         const json = await response.json()
         return json
      }
   } catch (error) {}
}
