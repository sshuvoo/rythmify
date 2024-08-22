'use client'

import { getTrack } from '@/actions/get-track'
import { useController } from '@/hooks/use-controller'
import {
   IconPlayerPauseFilled,
   IconPlayerPlayFilled,
} from '@tabler/icons-react'
import { useRef, useState } from 'react'

export default function TrackPlayButton({
   id,
   playlist,
}: {
   id: string
   playlist: any[]
}) {
   const [isPlaying, setIsPlaying] = useState(false)
   const controller = useController()

   const handlePlay = async () => {
      controller?.setCurrrentTrack(id, playlist)
   }

   const handlePause = async () => {}

   return (
      <div>
         {isPlaying ? (
            <button
               onClick={handlePause}
               className="w-10 h-10 flex justify-center items-center bg-green-500 rounded-full"
            >
               <IconPlayerPauseFilled className=" rounded-full text-white w-6 h-6" />
            </button>
         ) : (
            <button
               onClick={handlePlay}
               className="w-10 h-10 flex justify-center items-center bg-green-500 rounded-full"
            >
               <IconPlayerPlayFilled className=" rounded-full text-white w-6 h-6" />
            </button>
         )}
      </div>
   )
}
