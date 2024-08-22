'use client'

import { getTrack } from '@/actions/get-track'
import {
   createContext,
   Dispatch,
   SetStateAction,
   useRef,
   useState,
} from 'react'

interface PlayerController {
   handlePlay: () => void
   play: (currentTrack: any, playlist: any) => void
   setPlaylist: (tracks: any[]) => void
   setCurrrentTrack: (track: any, playlist: any[]) => Promise<void>
   tracks: any[] | undefined
   playingTrack: any
   playerState: {
      isPlaying: boolean
      volume: number
      adjustVolume: (vol: number) => void
      duration: number
      currentTime: number
      setCurrentTime: Dispatch<SetStateAction<number>>
   }
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
   const [volume, setVolume] = useState<number>(0.3)
   const [currentTime, setCurrentTime] = useState<number>(0)
   const [playerState, setPlayerState] = useState({
      isPlaying: false,
      volume,
      duration: 0,
      currentTime,
      setCurrentTime,
   })

   const trackRef = useRef<HTMLAudioElement>()

   const setCurrrentTrack = async (track_id: any, playlist: any[]) => {
      const retriveTrack = await getTrack(track_id)
      setPlayingTrack(retriveTrack)
      play(retriveTrack, playlist)
   }

   const adjustVolume = (newVol: number) => {
      setVolume(newVol)
      if (trackRef.current instanceof HTMLAudioElement) {
         trackRef.current.volume = newVol
      }
   }

   const setPlaylist = (playlist: any[]) => {
      console.log(playlist)
      setTracks(playlist)
   }

   const play = (currentTrack: any, playlist: any) => {
      if (trackRef.current instanceof HTMLAudioElement) {
         trackRef.current.src = currentTrack.preview_url
         trackRef.current.play()
      } else {
         trackRef.current = new Audio(currentTrack.preview_url)
         trackRef.current.play()
         trackRef.current.addEventListener('loadedmetadata', (e) => {
            setPlayerState((pre) => ({
               ...pre,
               duration: trackRef.current?.duration || 0,
            }))
         })

         trackRef.current.addEventListener('timeupdate', (e) => {
            if (trackRef.current instanceof HTMLAudioElement) {
               setCurrentTime(trackRef.current?.currentTime)
            }
         })

         trackRef.current.addEventListener('playing', (e) => {
            setPlayerState((pre) => ({ ...pre, isPlaying: true }))
         })
         trackRef.current.addEventListener('play', () => {
            setPlayerState((pre) => ({ ...pre, isPlaying: true }))
         })
         trackRef.current.addEventListener('pause', () => {
            setPlayerState((pre) => ({ ...pre, isPlaying: false }))
         })
         trackRef.current.addEventListener('ended', () => {
            setPlayerState((pre) => ({ ...pre, isPlaying: false }))
            const curentIndex = playlist.findIndex(
               (track: any) => track.id === currentTrack.id
            )
            const nextIndex =
               playlist.length - 1 > curentIndex ? curentIndex + 1 : 0
            console.log(nextIndex)
            const nextTrackId = playlist[nextIndex].id
            setCurrrentTrack(nextTrackId, playlist)
         })
      }
   }

   const handlePlay = () => {
      if (trackRef.current instanceof HTMLAudioElement) {
         if (playerState.isPlaying) trackRef.current.pause()
         else trackRef.current.play()
      }
   }

   const controller = {
      handlePlay,
      play,
      setPlaylist,
      tracks,
      setCurrrentTrack,
      playingTrack,
      playerState: { ...playerState, currentTime, volume, adjustVolume },
   }
   // const handlePlay = async () => {
   //    if (trackRef.current instanceof HTMLAudioElement) {
   //       trackRef.current.play()
   //    } else {
   //       const track = await getTrack(id)
   //       trackRef.current = new Audio(track.currentTrack.preview_url)
   //       trackRef.current.play()
   //    }
   //    setIsPlaying(true)
   // }
   console.log(playerState.volume)
   return (
      <PlayerContext.Provider value={controller}>
         {children}
      </PlayerContext.Provider>
   )
}
