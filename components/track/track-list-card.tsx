import { msToDuration } from '@/utils/ms-to-duration'
import { Image } from '@mantine/core'
import TrackPlayButton from '../button/track-play-button'

export function TrackListCard({
   track,
   playlist,
}: {
   track: any
   playlist: any[]
}) {
   return (
      <tr className="hover:bg-gray-100 rounded-md">
         <td className="flex gap-4 py-2 px-4">
            <div>
               <Image
                  radius="md"
                  h={40}
                  w={40}
                  src={track?.album?.images[0].url}
                  alt=""
               />
            </div>
            <h3 className="text-xl font-medium">{track.name}</h3>
         </td>
         <td>
            <h3 className="text-sm line-clamp-1">
               {track.artists.map((artist: any) => artist.name).join(' x ')}
            </h3>
         </td>
         <td>
            <h3 className="text-sm">{msToDuration(track.duration_ms)}</h3>
         </td>
         <td>
            <TrackPlayButton playlist={playlist} id={track.id} />
         </td>
      </tr>
   )
}
