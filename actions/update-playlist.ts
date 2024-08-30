'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export const updatePlaylist = async (data: any, playlist_id: string) => {
   const session = await auth()
   try {
      if (!session) throw new Error('Please login first')
      const response = await fetch(
         `${process.env.BASE_API_URL}/playlists/${playlist_id}`,
         {
            method: 'PUT',
            headers: {
               Authorization: `Bearer ${session.token.access_token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         }
      )

      if (!response.ok) throw new Error('Server error')
      revalidatePath('/')
      revalidatePath(`/playlists/${playlist_id}`)
   } catch (error) {
      console.log(error)
   }
}
