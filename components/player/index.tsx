'use client'

import { useController } from '@/hooks/use-controller'
import { Slider } from '@mantine/core'
import {
   IconArrowsShuffle,
   IconPlayerPlayFilled,
   IconPlayerSkipBackFilled,
   IconPlayerSkipForwardFilled,
   IconRepeatOnce,
} from '@tabler/icons-react'

export function Player() {
   const controller = useController()

   return (
      <div className="fixed bottom-4 rounded-md w-full max-w-3xl bg-[#f7f7f7cc] border left-1/2 -translate-x-1/2 p-4 shadow z-[1000] backdrop-blur-sm">
         <div>{controller?.playingTrack?.name}</div>
         <div className="flex justify-center items-center gap-6 py-4">
            <button title="Shuffle">
               <IconArrowsShuffle />
            </button>
            <button title="Previous">
               <IconPlayerSkipBackFilled />
            </button>
            <button title="Play/Pause">
               <IconPlayerPlayFilled />
               {/* <IconPlayerPauseFilled /> */}
            </button>
            <button title="Next">
               <IconPlayerSkipForwardFilled />
            </button>
            <button title="Repeat">
               <IconRepeatOnce />
            </button>
         </div>
         <div>
            <Slider thumbSize={20} defaultValue={20} />
         </div>
      </div>
   )
}
