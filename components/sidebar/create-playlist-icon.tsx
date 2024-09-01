'use client'

import { Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CreatePlaylistModal } from '../modal/create-playlist-modal'
import { useSession } from 'next-auth/react'

export default function CreatePlaylistIcon() {
   const { status } = useSession()
   const [isOpen, setIsOpen] = useState(false)

   return (
      <>
         <Tooltip
            label={
               status === 'loading' || status === 'unauthenticated'
                  ? 'Please login first'
                  : 'Create a playlist'
            }
         >
            <button
               disabled={status === 'loading' || status === 'unauthenticated'}
               onClick={() => {
                  setIsOpen(true)
               }}
               type="button"
            >
               <IconPlus />
            </button>
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
