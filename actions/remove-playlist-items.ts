'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export const removePlaylistItems = async (
   playlist_id: string,
   track_ids: string[],
   snapshot_id: string
) => {
   const session = await auth()
   if (!session) throw new Error('Please login first')
   const response = await fetch(
      `${process.env.BASE_API_URL}/playlists/${playlist_id}/tracks`,
      {
         method: 'DELETE',
         headers: {
            Authorization: `Bearer ${session.token.access_token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            tracks: track_ids.map((track_id) => ({
               uri: `spotify:track:${track_id}`,
            })),
            snapshot_id,
         }),
      }
   )
   if (!response.ok) throw new Error('Server error')
   revalidatePath('/')
   revalidatePath(`/playlists/${playlist_id}`)
}
