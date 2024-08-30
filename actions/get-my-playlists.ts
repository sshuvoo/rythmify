'use server'

import { auth } from '@/auth'

export const getMyPlaylists = async () => {
   const session = await auth()
   if (!session) return null

   try {
      const response = await fetch(`${process.env.BASE_API_URL}/me/playlists`, {
         headers: { Authorization: `Bearer ${session.token.access_token}` },
      })
      if (!response.ok) throw new Error('Server error')
      const json = await response.json()
      return json
   } catch (error) {
      console.log(error)
   }
}
