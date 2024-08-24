'use client'

import { getTrack } from '@/actions/get-track'
import { useLocalStorage } from '@mantine/hooks'
import {
   createContext,
   Dispatch,
   SetStateAction,
   useEffect,
   useRef,
   useState,
} from 'react'
import toast from 'react-hot-toast'

type Strategy = 'repeat' | 'repeat-once' | 'no-repeat'

interface PlayerController {
   handlePlay: () => void
   handlePrev: () => void
   handleNext: () => void
   handleRepeat: () => void
   handleShuffle: () => void
   handleSlider: (value: number) => void
   addToPlayer: (newPlaylist: string[], newPlayId: string) => void
   playerState: {
      playId: string | null
      isPlaying: boolean
      volume: number
      adjustVolume: (vol: number) => void
      duration: number
      currentTime: number
      setCurrentTime: Dispatch<SetStateAction<number>>
      currentTrack: any
      strategy: Strategy
      isShuffled: boolean
   }
}

export const PlayerContext = createContext<PlayerController | undefined>(
   undefined
)

interface Children {
   children: React.ReactNode
}

export const PlayerProvider = ({ children }: Children) => {
   const [playlist, setPlaylist] = useState<string[]>([])
   const [playId, setPlayId] = useState<string | null>(null)
   const [currentTrack, setCurrentTrack] = useState<any>()
   const audio = useRef<HTMLAudioElement>()
   const [volume, setVolume] = useLocalStorage({
      key: 'rythmify-volume',
      defaultValue: 1,
   })
   const [duration, setDuration] = useState<number>(0)
   const [currentTime, setCurrentTime] = useState<number>(0)
   const [isPlaying, setIsPlaying] = useState(false)
   const [strategy, setStrategy] = useState<Strategy>('repeat')
   const strategyRef = useRef<Strategy>('repeat')
   const [isShuffled, setIsShuffled] = useState(false)
   const shuffleRef = useRef(false)

   useEffect(() => {
      const startPlaying = async (track_id: string) => {
         const track = await getTrack(track_id)
         if (track?.preview_url) {
            if (audio.current instanceof HTMLAudioElement) {
               audio.current.src = track.preview_url
               audio.current.play()
            } else {
               audio.current = new Audio(track.preview_url)
               audio.current.play()
            }
            if (audio.current instanceof HTMLAudioElement) {
               audio.current.addEventListener('loadedmetadata', () => {
                  setDuration(audio.current?.duration!)
               })
               audio.current.addEventListener('timeupdate', () => {
                  setCurrentTime(audio.current?.currentTime!)
               })
               audio.current.addEventListener('play', () => {
                  setIsPlaying(true)
               })
               audio.current.addEventListener('pause', () => {
                  setIsPlaying(false)
               })
               audio.current.addEventListener('ended', () => {
                  setIsPlaying(false)
                  if (strategyRef.current === 'repeat') {
                     const currentIndex = playlist.findIndex(
                        (trackId: any) => trackId === playId
                     )
                     if (shuffleRef.current) {
                        const randomIndex = Math.floor(
                           Math.random() * playlist.length
                        )
                        if (currentIndex === randomIndex) {
                           const trackIndex =
                              playlist.length - 1 > currentIndex
                                 ? currentIndex + 1
                                 : 0
                           setPlayId(playlist[trackIndex])
                        } else setPlayId(playlist[randomIndex])
                     } else {
                        const nextIndex =
                           playlist.length - 1 > currentIndex
                              ? currentIndex + 1
                              : 0
                        setPlayId(playlist[nextIndex])
                     }
                  } else if (strategyRef.current === 'repeat-once') {
                     audio.current?.play()
                  }
               })
            }
            audio.current.volume = volume
            setCurrentTrack(track)
         } else if (playlist?.length > 1) {
            toast.error(
               `${
                  track?.name?.length > 15
                     ? track?.name?.slice(0, 13) + '...'
                     : track?.name
               } is unable to play.`,
               { duration: 3000 }
            )
            handleNext()
         }
      }
      if (playId) startPlaying(playId)
   }, [playId, playlist])

   const adjustVolume = (newVol: number) => {
      setVolume(newVol)
      if (audio.current instanceof HTMLAudioElement) {
         audio.current.volume = newVol
      }
   }

   const addToPlayer = (newPlaylist: string[], newPlayId: string) => {
      setPlaylist(newPlaylist)
      setPlayId(newPlayId)
   }

   const handlePlay = () => {
      if (audio.current instanceof HTMLAudioElement) {
         if (isPlaying) audio.current.pause()
         else audio.current.play()
      }
   }

   const handleNext = () => {
      if (audio.current instanceof HTMLAudioElement) {
         const currentIndex = playlist.findIndex(
            (trackId: string) => trackId === playId
         )
         const nextIndex =
            playlist.length - 1 > currentIndex ? currentIndex + 1 : 0
         setPlayId(playlist[nextIndex])
      }
   }

   const handlePrev = () => {
      if (audio.current instanceof HTMLAudioElement) {
         const currentIndex = playlist.findIndex(
            (trackId: string) => trackId === playId
         )
         const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : playlist.length - 1
         setPlayId(playlist[prevIndex])
      }
   }

   const handleRepeat = () => {
      if (strategy === 'repeat') {
         setStrategy('repeat-once')
         strategyRef.current = 'repeat-once'
      } else if (strategy === 'repeat-once') {
         setStrategy('no-repeat')
         strategyRef.current = 'no-repeat'
      } else {
         setStrategy('repeat')
         strategyRef.current = 'repeat'
      }
   }

   const handleShuffle = () => {
      setIsShuffled(!isShuffled)
      shuffleRef.current = !isShuffled
   }

   const handleSlider = (value: number) => {
      if (audio.current instanceof HTMLAudioElement) {
         audio.current.currentTime = value
      }
   }

   const controller = {
      handlePlay,
      handleNext,
      handlePrev,
      addToPlayer,
      setPlaylist,
      handleRepeat,
      handleShuffle,
      handleSlider,
      playerState: {
         currentTime,
         setCurrentTime,
         volume,
         adjustVolume,
         isPlaying,
         duration,
         playId,
         currentTrack,
         strategy,
         isShuffled,
      },
   }

   return (
      <PlayerContext.Provider value={controller}>
         {children}
      </PlayerContext.Provider>
   )
}
