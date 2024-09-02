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
   IconRepeat,
   IconRepeatOff,
   IconRepeatOnce,
   IconVolume,
   IconVolumeOff,
} from '@tabler/icons-react'
import { Audio as AudioPlayAnimation } from 'react-loader-spinner'

export function Player() {
   const controller = useController()
   return (
      <div className="fixed bottom-0 left-1/2 z-[1000] w-full max-w-3xl -translate-x-1/2 rounded-md border-2 border-black/10 bg-[#f7f7f7cc] p-4 shadow backdrop-blur-md">
         <div className="grid grid-cols-[auto,1fr,150px] items-center py-2 xl:grid-cols-3">
            <div className="flex items-end gap-2 px-4">
               <AudioPlayAnimation
                  height="25"
                  width="20"
                  color="#000000"
                  ariaLabel="audio-loading"
                  wrapperClass="wrapper-class"
                  visible={controller?.playerState.isPlaying}
               />
               <p className="line-clamp-1 hidden text-sm lg:block">
                  {controller?.playerState.currentTrack?.name}
               </p>
            </div>
            <div className="flex items-center justify-center gap-6">
               <button
                  onClick={controller?.handleShuffle}
                  title="Shuffle"
                  disabled={!(controller?.playerState.strategy === 'repeat')}
                  className="relative disabled:opacity-30"
               >
                  <IconArrowsShuffle />
                  {controller?.playerState.isShuffled && (
                     <span className="absolute -right-1 -top-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                  )}
               </button>
               <button onClick={controller?.handlePrev} title="Previous">
                  <IconPlayerSkipBackFilled />
               </button>
               <button
                  onClick={controller?.handlePlay}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black"
                  title="Play/Pause"
               >
                  {controller?.playerState.isPlaying ? (
                     <IconPlayerPauseFilled className="text-white" />
                  ) : (
                     <IconPlayerPlayFilled className="text-white" />
                  )}
               </button>
               <button onClick={controller?.handleNext} title="Next">
                  <IconPlayerSkipForwardFilled />
               </button>
               <button onClick={controller?.handleRepeat}>
                  {controller?.playerState.strategy === 'repeat-once' && (
                     <IconRepeatOnce title="Repeat the current song only" />
                  )}
                  {controller?.playerState.strategy === 'no-repeat' && (
                     <IconRepeatOff title="No repeat" />
                  )}
                  {controller?.playerState.strategy === 'repeat' && (
                     <IconRepeat title="Repeat through list" />
                  )}
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
         <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4 px-4">
            <p className="text-sm">
               {sToDuration(
                  controller?.playerState.duration! -
                     controller?.playerState.currentTime!
               )}
            </p>
            <Slider
               thumbSize={12}
               size="xs"
               min={0}
               max={controller?.playerState.duration || 60}
               step={1}
               value={controller?.playerState.currentTime}
               onChange={controller?.handleSlider}
               label={(value: number) => `${sToDuration(value)}`}
            />
            <p className="text-sm">
               {sToDuration(controller?.playerState.duration)}
            </p>
         </div>
      </div>
   )
}
