import { ModalContext } from '@/provider/modal-provider'
import { useContext } from 'react'

export function useModal() {
   return useContext(ModalContext)
}
