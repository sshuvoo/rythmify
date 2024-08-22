'use client'

import { useController } from '@/hooks/use-controller'
import { sToDuration } from '@/utils/s-to-duration'
import { Slider } from '@mantine/core'
import {
   IconArrowsShuffle,
   IconPlayerPauseFilled,
   IconPlayerPlayFilled,
   IconPlayerSkipBackFilled,
   IconPlayerSkipForwardFilled,
   IconRepeatOnce,
   IconVolume,
   IconVolumeOff,
} from '@tabler/icons-react'
import { Audio as AudioPlayAnimation } from 'react-loader-spinner'

export function Player() {
   const controller = useController()
   return (
      <div className="fixed bottom-4 rounded-md w-full max-w-3xl bg-[#f7f7f7cc] border left-1/2 -translate-x-1/2 p-4 shadow z-[1000] backdrop-blur-sm">
         <div className="grid grid-cols-3 items-center py-2">
            <div className="px-4 flex items-end gap-2">
               <AudioPlayAnimation
                  height="25"
                  width="20"
                  color="#000000"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  visible={controller?.playerState.isPlaying}
               />
               <p className="line-clamp-1 text-sm">
                  {controller?.playingTrack?.name}
               </p>
            </div>
            <div className="flex justify-center items-center gap-6">
               <button title="Shuffle">
                  <IconArrowsShuffle />
               </button>
               <button title="Previous">
                  <IconPlayerSkipBackFilled />
               </button>
               <button
                  onClick={controller?.handlePlay}
                  className="bg-black w-10 h-10 flex items-center justify-center rounded-full"
                  title="Play/Pause"
               >
                  {controller?.playerState.isPlaying ? (
                     <IconPlayerPauseFilled className="text-white" />
                  ) : (
                     <IconPlayerPlayFilled className="text-white" />
                  )}
               </button>
               <button title="Next">
                  <IconPlayerSkipForwardFilled />
               </button>
               <button title="Repeat">
                  <IconRepeatOnce />
               </button>
            </div>
            <div className="grid grid-cols-[auto,1fr] items-center gap-2 px-4">
               {controller?.playerState.volume! > 0 ? (
                  <button
                     onClick={() => controller?.playerState.adjustVolume(0)}
                  >
                     <IconVolume title="Volume" />
                  </button>
               ) : (
                  <button
                     onClick={() => controller?.playerState.adjustVolume(0.3)}
                  >
                     <IconVolumeOff title="Volume Off" />
                  </button>
               )}
               <Slider
                  value={controller?.playerState.volume}
                  onChange={controller?.playerState.adjustVolume}
                  color="black"
                  thumbSize={10}
                  size="xs"
                  min={0}
                  max={1}
                  step={0.001}
                  label={(value: number) => `${Math.trunc(value * 100)}%`}
               />
            </div>
         </div>
         <div className="grid grid-cols-[auto,1fr,auto] items-center px-4 gap-x-4">
            <p>
               {sToDuration(
                  controller?.playerState.duration! -
                     controller?.playerState.currentTime!
               )}
            </p>
            <Slider
               thumbSize={16}
               size="xs"
               min={0}
               max={controller?.playerState.duration || 60}
               step={1}
               value={controller?.playerState.currentTime}
               onChange={controller?.playerState.setCurrentTime}
               label={(value: number) => `${sToDuration(value)}`}
            />
            <p>{sToDuration(controller?.playerState.duration)}</p>
         </div>
      </div>
   )
}
