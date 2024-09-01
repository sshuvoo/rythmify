'use client'

import { removePlaylistItems } from '@/actions/remove-playlist-items'
import { Menu, rem, Tooltip } from '@mantine/core'
import { IconDots, IconMusic, IconTrash } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function TrackActionButton({
   playlist_id,
   track_id,
   snapshot_id,
   isMyPlaylist,
}: {
   playlist_id: string
   track_id: string
   snapshot_id: string
   isMyPlaylist: boolean
}) {
   const session = useSession()

   const removeFromPlaylist = async () => {
      try {
         await removePlaylistItems(playlist_id, [track_id], snapshot_id)
         toast.success('Hurrah! Removed successfully')
      } catch (error) {
         toast.error('Oops! Failed to remove')
      }
   }

   return (
      <Menu shadow="md" width={200} position="bottom-end">
         <Menu.Target>
            <Tooltip
               label={
                  session.status === 'loading' ||
                  session.status === 'unauthenticated'
                     ? 'Login first'
                     : !isMyPlaylist
                       ? 'You have no access'
                       : 'Remove Items'
               }
            >
               <button
                  disabled={
                     session.status === 'loading' ||
                     session.status === 'unauthenticated' ||
                     !isMyPlaylist
                  }
               >
                  <IconDots />
               </button>
            </Tooltip>
         </Menu.Target>

         <Menu.Dropdown>
            <Menu.Label>Remove from playlist</Menu.Label>

            <Menu.Item
               disabled={
                  session.status === 'loading' ||
                  session.status === 'unauthenticated' ||
                  !isMyPlaylist
               }
               onClick={removeFromPlaylist}
               leftSection={
                  <IconMusic style={{ width: rem(18), height: rem(18) }} />
               }
               rightSection={
                  <IconTrash style={{ width: rem(18), height: rem(18) }} />
               }
            >
               Remove
            </Menu.Item>
         </Menu.Dropdown>
      </Menu>
   )
}
