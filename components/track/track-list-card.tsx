import { msToDuration } from '@/utils/ms-to-duration'
import { Image, Tooltip } from '@mantine/core'
import TrackPlayButton from '../button/track-play-button'
import { AudioPlayAnimation } from './audio-play-animation'
import moment from 'moment'

export function TrackListCard({
   track,
   playlist,
   index,
   added_at,
}: {
   track: any
   playlist: any[]
   index: number
   added_at?: string
}) {
   return (
      <tr className="hover:bg-gray-100 rounded-md">
         <td className="flex gap-4 py-2 my-1 px-4 items-center">
            {track?.album?.images[0] ? (
               <Image
                  radius="md"
                  h={40}
                  w={40}
                  src={track?.album?.images[0].url}
                  alt=""
               />
            ) : (
               <h4>{index + 1 > 9 ? index + 1 : `0${index + 1}`}.</h4>
            )}
            <Tooltip label={track.name}>
               <h3 className="text-lg font-medium">
                  {track.name.length > 30
                     ? track.name.slice(0, 27) + '...'
                     : track.name}
               </h3>
            </Tooltip>
         </td>
         <td>
            <AudioPlayAnimation track_id={track.id} />
         </td>
         <td>
            <h3 className="text-sm line-clamp-1">
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
               <h3 className="text-sm line-clamp-1">
                  {moment(added_at).format('DD-MMM-YYYY')}
               </h3>
            </td>
         )}
         <td>
            <h3 className="text-sm">{msToDuration(track.duration_ms)}</h3>
         </td>
         <td>
            <TrackPlayButton playlist={playlist} track_id={track.id} />
         </td>
      </tr>
   )
}
