'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export const uploadPlaylistImage = async (
   playlist_id: string,
   base64Image: string
) => {
   const session = await auth()

   if (!session) throw new Error('Please login first')
   const response = await fetch(
      `${process.env.BASE_API_URL}/playlists/${playlist_id}/images`,
      {
         method: 'PUT',
         headers: {
            Authorization: `Bearer ${session.token.access_token}`,
            'Content-Type': 'image/jpeg',
         },
         body: base64Image,
      }
   )
   if (!response.ok) throw new Error(response.statusText)
   revalidatePath('/')
   revalidatePath(`/playlists/${playlist_id}`)
}
