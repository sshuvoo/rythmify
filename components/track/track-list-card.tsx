import { msToDuration } from '@/utils/ms-to-duration'
import { Tooltip } from '@mantine/core'
import TrackPlayButton from '../button/track-play-button'
import { AudioPlayAnimation } from './audio-play-animation'
import moment from 'moment'
import TrackActionButton from '../playlist/track-action-button'
import Image from 'next/image'
import { IconMusic } from '@tabler/icons-react'

export function TrackListCard({
   track,
   playlist,
   added_at,
   playlist_id,
   snapshot_id,
   isMyPlaylist,
}: {
   track: any
   playlist: any[]
   index: number
   added_at?: string
   playlist_id: string
   snapshot_id: string
   isMyPlaylist: boolean
}) {
   return (
      <tr className="rounded-md hover:bg-gray-100">
         <td className="grid grid-cols-[auto,1fr] gap-2 py-4 pl-1 md:pl-2 xl:gap-4 xl:pl-4">
            <div className="relative size-10">
               {track?.album?.images && track?.album?.images[0]?.url ? (
                  <Image
                     fill
                     className="rounded object-cover"
                     src={track?.album?.images[0].url}
                     alt=""
                  />
               ) : (
                  <IconMusic className="h-full w-full" stroke={1} />
               )}
            </div>
            <div>
               <Tooltip label={track.name}>
                  <h3 className="line-clamp-1 font-medium xl:text-xl">
                     {track.name}
                  </h3>
               </Tooltip>
               <h3 className="line-clamp-1 text-xs xl:hidden">
                  {track.artists.map((artist: any) => artist.name).join(' x ')}
               </h3>
            </div>
         </td>
         <td>
            <AudioPlayAnimation track_id={track.id} />
         </td>
         <td className="hidden md:table-cell">
            <h3 className="line-clamp-1 text-sm">
               {track.artists.length > 2
                  ? track.artists
                       .slice(0, 2)
                       .map((artist: any) => artist.name)
                       .join(' x ') + '...'
                  : track.artists.map((artist: any) => artist.name).join(' x ')}
            </h3>
         </td>
         {added_at && (
            <td className="hidden xl:table-cell">
               <h3 className="line-clamp-1 text-sm">
                  {moment(added_at).format('DD-MMM-YYYY')}
               </h3>
            </td>
         )}
         <td className="hidden xl:table-cell">
            <h3 className="text-sm">{msToDuration(track.duration_ms)}</h3>
         </td>
         <td className="pr-1 md:pr-2 xl:pr-4">
            <div className="flex items-center gap-2">
               <TrackPlayButton playlist={playlist} track_id={track.id} />
               <TrackActionButton
                  isMyPlaylist={isMyPlaylist}
                  snapshot_id={snapshot_id}
                  playlist_id={playlist_id}
                  track_id={track.id}
               />
            </div>
         </td>
      </tr>
   )
}
