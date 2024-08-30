'use client'

import { useModal } from '@/hooks/use-modal'
import { Button, Menu, rem } from '@mantine/core'
import {
   IconDots,
   IconEdit,
   IconPhotoPlus,
   IconPlus,
   IconTrash,
} from '@tabler/icons-react'

export function SettingsMenu({ playlist }: { playlist: any }) {
   const {
      edit: { editModalOpen, onSetPlaylistInfo },
   } = useModal()
   
   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>
            <Button color="#000000">
               <IconDots />
            </Button>
         </Menu.Target>

         <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
               leftSection={
                  <IconPhotoPlus style={{ width: rem(14), height: rem(14) }} />
               }
            >
               Add Photo
            </Menu.Item>
            <Menu.Item
               onClick={() => {
                  onSetPlaylistInfo({
                     id: playlist?.id,
                     name: playlist?.name || '',
                     description: playlist?.description || '',
                     public: playlist?.public ? 'public' : 'private',
                  })
                  editModalOpen()
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
   )
}
