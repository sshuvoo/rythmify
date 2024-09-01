'use client'

import { Button, Menu, rem, Tooltip } from '@mantine/core'
import {
   IconDots,
   IconEdit,
   IconPhotoPlus,
   IconPlus,
   IconTrash,
} from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { EditPlaylistModal } from '../modal/edit-playlist-modal'
import PhotoModal from '../modal/photo-modal'

export function SettingsMenu({
   playlist,
   isMyPlaylist,
}: {
   playlist: any
   isMyPlaylist: boolean
}) {
   const { status } = useSession()
   const [isOpenPhotoModal, setIsOpenPhotoModal] = useState(false)
   const [isOpenEditModal, setIsOpenEditModal] = useState(false)

   return (
      <>
         <Menu shadow="md" width={200}>
            <Menu.Target>
               <Tooltip
                  label={
                     status === 'loading' || status === 'unauthenticated'
                        ? 'Please login first'
                        : isMyPlaylist
                          ? 'Playlist Options'
                          : 'You have no access'
                  }
               >
                  <Button
                     disabled={
                        status === 'loading' ||
                        status === 'unauthenticated' ||
                        !isMyPlaylist
                     }
                     color="#000000"
                  >
                     <IconDots />
                  </Button>
               </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
               <Menu.Label>Application</Menu.Label>
               <Menu.Item
                  onClick={() => {
                     setIsOpenPhotoModal(!isOpenPhotoModal)
                  }}
                  leftSection={
                     <IconPhotoPlus
                        style={{ width: rem(14), height: rem(14) }}
                     />
                  }
               >
                  Add Photo
               </Menu.Item>
               <Menu.Item
                  onClick={() => {
                     setIsOpenEditModal(true)
                  }}
                  leftSection={
                     <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
               >
                  Edit Playlist
               </Menu.Item>
               <Menu.Item
                  leftSection={
                     <IconPlus style={{ width: rem(14), height: rem(14) }} />
                  }
                  disabled
               >
                  Add Songs
               </Menu.Item>

               <Menu.Divider />

               <Menu.Label>Danger zone</Menu.Label>
               <Menu.Item
                  color="red"
                  leftSection={
                     <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  disabled
               >
                  Delete playlist
               </Menu.Item>
            </Menu.Dropdown>
         </Menu>
         {isOpenPhotoModal &&
            createPortal(
               <PhotoModal
                  playlist_id={playlist.id}
                  onClose={() => {
                     setIsOpenPhotoModal(false)
                  }}
               />,
               document.getElementById('modal-root')!
            )}
         {isOpenEditModal &&
            createPortal(
               <EditPlaylistModal
                  info={{
                     id: playlist?.id,
                     name: playlist?.name || '',
                     description: playlist?.description || '',
                     public: playlist?.public ? 'public' : 'private',
                  }}
                  onClose={() => {
                     setIsOpenEditModal(false)
                  }}
               />,
               document.getElementById('modal-root')!
            )}
      </>
   )
}
