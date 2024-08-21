'use client'

import { PlayerContext } from '@/provider/player-provider'
import { useContext } from 'react'

export const useController = () => {
   return useContext(PlayerContext)
}
