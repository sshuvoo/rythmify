'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export const addItemsToPlaylist = async (
   playlist_id: string,
   track_ids: string[]
) => {
   const session = await auth()
   if (!session) throw new Error('Please login first')
   const query = track_ids
      .map((track_id) => `spotify:track:${track_id}`)
      .join(',')
   const response = await fetch(
      `${process.env.BASE_API_URL}/playlists/${playlist_id}/tracks?uris=${query}`,
      {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${session.token.access_token}`,
            'Content-Type': 'application/json',
         },
      }
   )
   if (!response.ok) throw new Error('Server error')
   revalidatePath('/')
   revalidatePath(`/playlists/${playlist_id}`)
}
