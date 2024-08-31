'use server'

import { auth } from '@/auth'
import { getMyPlaylists } from './get-my-playlists'

export const checkMyPlaylist = async (playlist_id: string) => {
   const session = await auth()
   if (!session) return false

   try {
      const myPlaylists = await getMyPlaylists()
      return myPlaylists.items.some((item: any) => item.id === playlist_id)
   } catch (error) {
      console.log(error)
      return false
   }
}
