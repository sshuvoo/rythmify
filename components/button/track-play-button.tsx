'use client'

import { getTrack } from '@/actions/get-track'
import { playSingleTrack } from '@/actions/play-track'
import {
   IconPlayerPauseFilled,
   IconPlayerPlayFilled,
} from '@tabler/icons-react'
import { useRef, useState } from 'react'

export default function TrackPlayButton({ id }: { id: string }) {
   const trackRef = useRef<HTMLAudioElement>()
   const [isPlaying, setIsPlaying] = useState(false)

   const handlePlay = async () => {
      if (trackRef.current) {
         trackRef.current.play()
      } else {
         const track = await getTrack(id)
         trackRef.current = new Audio(track.preview_url)
         trackRef.current.play()
      }
      setIsPlaying(true)
   }

   const handlePause = async () => {
      if (trackRef.current) {
         trackRef.current.pause()
         setIsPlaying(false)
      }
   }

   return (
      <div className="px-4">
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
