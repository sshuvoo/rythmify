'use client'

import { Button, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CreatePlaylistModal } from '../modal/create-playlist-modal'

export function CreatePlaylistButton() {
   const { status } = useSession()
   const [isOpen, setIsOpen] = useState(false)

   return (
      <>
         <Tooltip
            label={
               status === 'loading' || status === 'unauthenticated'
                  ? 'Please login first'
                  : 'Click to start'
            }
         >
            <Button
               disabled={status === 'loading' || status === 'unauthenticated'}
               onClick={() => {
                  setIsOpen(true)
               }}
               color="#000000"
               type="button"
               leftSection={<IconPlus />}
            >
               Create new playlist
            </Button>
         </Tooltip>
         {isOpen &&
            createPortal(
               <CreatePlaylistModal
                  onClose={() => {
                     setIsOpen(false)
                  }}
               />,
               document.getElementById('modal-root')!
            )}
      </>
   )
}
