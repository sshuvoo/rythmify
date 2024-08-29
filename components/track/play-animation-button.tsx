'use client'

import { Audio as AudioPlayAnimation } from 'react-loader-spinner'
import TrackPlayButton from '../button/track-play-button'
import { useController } from '@/hooks/use-controller'

export function PlayAnimationButton({
   track_id,
   playlist,
}: {
   track_id: string
   playlist: string[]
}) {
   const controller = useController()

   return controller?.playerState.isPlaying &&
      controller.playerState.playId === track_id ? (
      <div className="px-[10px]">
         <AudioPlayAnimation
            height="25"
            width="20"
            color="#000000"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={controller?.playerState.isPlaying}
         />
      </div>
   ) : (
      <div className="px-[10px] opacity-0 group-hover:opacity-100">
         <TrackPlayButton playlist={playlist} track_id={track_id} />
      </div>
   )
}
