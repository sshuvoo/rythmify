import { msToDuration } from '@/utils/ms-to-duration'
import { Tooltip } from '@mantine/core'
import moment from 'moment'
import AddToPlaylistButton from '../artist/add-to-playlist-button'
import TrackPlayButton from '../button/track-play-button'
import { AudioPlayAnimation } from '../track/audio-play-animation'

export function AlbumTrackCard({
   track,
   index,
   added_at,
   playlist,
   myPlaylists,
}: {
   track: any
   index: number
   added_at?: string
   playlist: any[]
   myPlaylists: any
}) {
   return (
      <tr className="rounded-md hover:bg-gray-100">
         <td className="my-1 py-4 pl-1 md:pl-2 xl:flex xl:items-center xl:gap-4 xl:pl-4">
            <h4 className="hidden xl:block">
               {index + 1 > 9 ? index + 1 : `0${index + 1}`}.
            </h4>
            <Tooltip label={track.name}>
               <h3 className="line-clamp-1 font-medium xl:text-lg">
                  {track.name.length > 30
                     ? track.name.slice(0, 27) + '...'
                     : track.name}
               </h3>
            </Tooltip>
         </td>
         <td>
            <AudioPlayAnimation track_id={track.id} />
         </td>
         <td className='px-1'>
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
            <td>
               <h3 className="line-clamp-1 text-sm">
                  {moment(added_at).format('DD-MMM-YYYY')}
               </h3>
            </td>
         )}
         <td className="hidden xl:table-cell">
            <h3 className="text-sm">{msToDuration(track.duration_ms)}</h3>
         </td>
         <td className="pr-1 md:pr-2 xl:pr-4">
            <div className="flex items-center gap-2 xl:gap-4">
               <TrackPlayButton playlist={playlist} track_id={track.id} />
               <AddToPlaylistButton
                  playlists={myPlaylists}
                  track_id={track.id}
               />
            </div>
         </td>
      </tr>
   )
}
