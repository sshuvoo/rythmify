'use client'

import { useModal } from '@/hooks/use-modal'
import { Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

export default function CreatePlaylistIcon() {
   const {
      add: { addModalOpen },
   } = useModal()
   
   return (
      <Tooltip label="Create a playlist">
         <button onClick={addModalOpen} type="button">
            <IconPlus />
         </button>
      </Tooltip>
   )
}
