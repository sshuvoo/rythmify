import { msToDuration } from '@/utils/ms-to-duration'
import Image from 'next/image'
import { AudioPlayAnimation } from '../track/audio-play-animation'
import TrackPlayButton from '../button/track-play-button'
import AddToPlaylistButton from './add-to-playlist-button'

export default function TrackCardLarge({
   track,
   playlist,
   myPlaylist,
}: {
   track: any
   playlist: any[]
   myPlaylist: any
}) {
   return (
      <div className="flex items-center justify-between gap-4 rounded-md p-2 hover:bg-gray-100">
         <div className="grid grid-cols-[auto,1fr] gap-4">
            <div className="relative size-12 xl:size-[70px]">
               <Image
                  className="rounded-md object-cover"
                  fill
                  src={track?.album?.images[0].url}
                  alt=""
               />
            </div>
            <div>
               <h3 className="line-clamp-1 font-medium xl:text-xl">
                  {track?.name}
               </h3>
               <h3 className="line-clamp-1 text-sm">
                  {track.artists.map((artist: any) => artist.name).join(' x ')}
               </h3>
               <h3 className="hidden text-sm xl:block">
                  {msToDuration(track.duration_ms)}
               </h3>
            </div>
         </div>
         <div className="flex items-center gap-4 px-4">
            <AudioPlayAnimation track_id={track.id} />
            <TrackPlayButton playlist={playlist} track_id={track.id} />
            <AddToPlaylistButton
               track_id={track.id}
               playlists={myPlaylist?.items || []}
            />
         </div>
      </div>
   )
}
