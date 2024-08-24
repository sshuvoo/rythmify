'use client'

import { useController } from '@/hooks/use-controller'
import {
   IconPlayerPauseFilled,
   IconPlayerPlayFilled,
} from '@tabler/icons-react'

export default function TrackPlayButton({
   track_id,
   playlist,
}: {
   track_id: string
   playlist: any[]
}) {
   const controller = useController()

   const handlePlay = async () => {
      if (controller?.playerState?.playId === track_id) {
         controller.handlePlay()
      } else {
         const playlistId = playlist.map((track) => track.id)
         controller?.addToPlayer(playlistId, track_id)
      }
   }

   return (
      <div>
         {controller?.playerState.isPlaying &&
         controller.playerState.playId === track_id ? (
            <button
               onClick={controller.handlePlay}
               className="w-8 h-8 flex justify-center items-center bg-green-500 rounded-full"
            >
               <IconPlayerPauseFilled className=" rounded-full text-white w-5 h-5" />
            </button>
         ) : (
            <button
               onClick={handlePlay}
               className="w-8 h-8 flex justify-center items-center bg-green-500 rounded-full"
            >
               <IconPlayerPlayFilled className=" rounded-full text-white w-5 h-5" />
            </button>
         )}
      </div>
   )
}
