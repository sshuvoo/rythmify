'use client'

import { useModal } from '@/hooks/use-modal'
import { Button, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'

export function CreatePlaylistButton() {
   const {
      add: { addModalOpen },
   } = useModal()
   const { status } = useSession()

   return (
      <Tooltip
         label={
            status === 'loading' || status === 'unauthenticated'
               ? 'Please login first'
               : 'Click to start'
         }
      >
         <Button
            disabled={status === 'loading' || status === 'unauthenticated'}
            onClick={addModalOpen}
            color="#000000"
            type="button"
            leftSection={<IconPlus />}
         >
            Create new playlist
         </Button>
      </Tooltip>
   )
}
