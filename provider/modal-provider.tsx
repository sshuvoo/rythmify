'use client'

import { useDisclosure } from '@mantine/hooks'
import { createContext, ReactNode, useState } from 'react'

interface ModalType {
   add: {
      addModalOpened: boolean
      addModalOpen: () => void
      addModalClose: () => void
   }
   edit: {
      editModalopened: boolean
      editModalOpen: () => void
      editModalClose: () => void
      playlistInfo: any
      onSetPlaylistInfo: (val: any) => void
   }
}

export const ModalContext = createContext<ModalType>({
   add: {
      addModalOpened: false,
      addModalOpen: () => {},
      addModalClose: () => {},
   },
   edit: {
      editModalopened: false,
      editModalOpen: () => {},
      editModalClose: () => {},
      playlistInfo: null,
      onSetPlaylistInfo: () => {},
   },
})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
   const [playlistInfo, setPlaylistInfo] = useState<any>()
   const [addModalOpened, { open: addModalOpen, close: addModalClose }] =
      useDisclosure(false)
   const [editModalopened, { open: editModalOpen, close: editModalClose }] =
      useDisclosure(false)

   const controller = {
      add: { addModalOpened, addModalOpen, addModalClose },
      edit: {
         editModalopened,
         editModalOpen,
         editModalClose,
         playlistInfo,
         onSetPlaylistInfo: (val: any) => setPlaylistInfo(val),
      },
   }

   return (
      <ModalContext.Provider value={controller}>
         {children}
      </ModalContext.Provider>
   )
}
