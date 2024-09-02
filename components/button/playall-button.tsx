'use client'

import { useController } from '@/hooks/use-controller'
import {
   IconPlayerPauseFilled,
   IconPlayerPlayFilled,
} from '@tabler/icons-react'

export default function PlayAll({ playlist }: { playlist: any[] }) {
   const controller = useController()
   const playlistId = playlist.map((track) => track.id)

   const handlePlay = async () => {
      if (
         controller?.playerState?.playId &&
         playlistId.includes(controller?.playerState?.playId)
      ) {
         controller.handlePlay()
      } else {
         controller?.addToPlayer(playlistId, playlistId[0])
      }
   }

   return (
      <div>
         {controller?.playerState.isPlaying &&
         playlistId.includes(controller?.playerState?.playId) ? (
            <button
               onClick={controller.handlePlay}
               className="flex h-10 w-10 items-center justify-center rounded-full bg-black xl:h-12 xl:w-12"
            >
               <IconPlayerPauseFilled className="h-6 w-6 rounded-full text-white" />
            </button>
         ) : (
            <button
               onClick={handlePlay}
               className="flex h-10 w-10 items-center justify-center rounded-full bg-black xl:h-12 xl:w-12"
            >
               <IconPlayerPlayFilled className="h-6 w-6 rounded-full text-white" />
            </button>
         )}
      </div>
   )
}
