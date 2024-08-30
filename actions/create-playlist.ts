'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export const createNewPlaylist = async (data: any) => {
   const session = await auth()
   try {
      if (!session) throw new Error('Please login first')
      const response = await fetch(
         `${process.env.BASE_API_URL}/users/${session?.user.id}/playlists`,
         {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${session.token.access_token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         }
      )

      if (!response.ok) throw new Error('Server error')
      const json = await response.json()
      revalidatePath('/')
      return json
   } catch (error) {
      console.log(error)
   }
}
