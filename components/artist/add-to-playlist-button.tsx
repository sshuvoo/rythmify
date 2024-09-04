'use client'

import { addItemsToPlaylist } from '@/actions/add-items-to-playlist'
import { Menu, rem, Tooltip } from '@mantine/core'
import { IconDots, IconMusic, IconPlus } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function AddToPlaylistButton({
   playlists,
   track_id,
}: {
   playlists: any[]
   track_id: string
}) {
   const handleAddToPlaylist = async (playlist_id: string) => {
      try {
         await addItemsToPlaylist(playlist_id, [track_id])
         toast.success('Hurrah! Added successfully')
      } catch (error) {
         toast.error('Oops! Failed to add')
      }
   }
   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>
            <Tooltip label="Add to playlist">
               <button>
                  <IconDots />
               </button>
            </Tooltip>
         </Menu.Target>

         <Menu.Dropdown>
            <Menu.Label>Add to your playlist</Menu.Label>
            {playlists.length > 0 ? (
               playlists.map((playlist) => (
                  <Menu.Item
                     onClick={() => handleAddToPlaylist(playlist.id)}
                     key={playlist.id}
                     leftSection={
                        <IconMusic
                           style={{ width: rem(18), height: rem(18) }}
                        />
                     }
                     rightSection={
                        <IconPlus style={{ width: rem(18), height: rem(18) }} />
                     }
                  >
                     {playlist.name}
                  </Menu.Item>
               ))
            ) : (
               <Menu.Item>No Playlist Found!</Menu.Item>
            )}
         </Menu.Dropdown>
      </Menu>
   )
}
