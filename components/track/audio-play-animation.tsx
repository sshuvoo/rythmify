'use client'

import { useController } from '@/hooks/use-controller'
import { Audio } from 'react-loader-spinner'

export function AudioPlayAnimation({ track_id }: { track_id: string }) {
   const controller = useController()
   return (
      controller?.playerState.isPlaying &&
      controller.playerState?.playId === track_id && (
         <Audio
            height="20"
            width="20"
            color="#000000"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
         />
      )
   )
}
