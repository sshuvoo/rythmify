'use client'

import { getTrack } from '@/actions/get-track'
import { createContext, useRef, useState } from 'react'

interface PlayerController {
   play: (preview_url: string) => void
   pause: () => void
   setPlaylist: (tracks: any[]) => void
   setCurrrentTrack: (track: any) => Promise<void>
   tracks: any[] | undefined
   playingTrack: any
}

export const PlayerContext = createContext<PlayerController | undefined>(
   undefined
)

interface Children {
   children: React.ReactNode
}

export const PlayerProvider = ({ children }: Children) => {
   const [tracks, setTracks] = useState<any[]>([])
   const [playingTrack, setPlayingTrack] = useState<any>(null)
   const trackRef = useRef<HTMLAudioElement>()

   const setCurrrentTrack = async (track_id: any) => {
      const retriveTrack = await getTrack(track_id)
      setPlayingTrack(retriveTrack)
      play(retriveTrack.preview_url)
   }

   const setPlaylist = (tracks: any[]) => setTracks(tracks)

   const play = (preview_url: string) => {
      if (trackRef.current instanceof HTMLAudioElement) {
         trackRef.current.play()
      } else {
         trackRef.current = new Audio(preview_url)
         trackRef.current.play()
      }
   }

   const pause = () => {}
   const controller = {
      play,
      pause,
      setPlaylist,
      tracks,
      setCurrrentTrack,
      playingTrack,
   }
   // const handlePlay = async () => {
   //    if (trackRef.current instanceof HTMLAudioElement) {
   //       trackRef.current.play()
   //    } else {
   //       const track = await getTrack(id)
   //       trackRef.current = new Audio(track.preview_url)
   //       trackRef.current.play()
   //    }
   //    setIsPlaying(true)
   // }

   // const handlePause = async () => {
   //    if (trackRef.current instanceof HTMLAudioElement) {
   //       trackRef.current.pause()
   //       setIsPlaying(false)
   //    }
   // }

   return (
      <PlayerContext.Provider value={controller}>
         {children}
      </PlayerContext.Provider>
   )
}
