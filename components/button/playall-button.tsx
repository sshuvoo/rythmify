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
               className="w-12 h-12 flex justify-center items-center bg-black rounded-full"
            >
               <IconPlayerPauseFilled className=" rounded-full text-white w-6 h-6" />
            </button>
         ) : (
            <button
               onClick={handlePlay}
               className="w-12 h-12 flex justify-center items-center bg-black rounded-full"
            >
               <IconPlayerPlayFilled className=" rounded-full text-white w-6 h-6" />
            </button>
         )}
      </div>
   )
}
