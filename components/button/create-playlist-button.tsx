'use client'

import { useModal } from '@/hooks/use-modal'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

export function CreatePlaylistButton() {
   const { open, onSetModalType } = useModal()
   return (
      <Button
         onClick={() => {
            onSetModalType('add')
            open()
         }}
         color="#000000"
         type="button"
         leftSection={<IconPlus />}
      >
         Create new playlist
      </Button>
   )
}
