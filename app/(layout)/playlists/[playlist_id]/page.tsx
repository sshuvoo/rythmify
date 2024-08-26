import { getImageColor } from '@/actions/get-image-color'
import { getPlaylist } from '@/actions/get-playlist'
import PlayAll from '@/components/button/playall-button'
import { TrackListCard } from '@/components/track/track-list-card'
import { Avatar } from '@mantine/core'

export default async function Playlist({
   params: { playlist_id },
}: {
   params: { playlist_id: string }
}) {
   const playlist = await getPlaylist(playlist_id)
   const palette = await getImageColor(playlist?.images[0]?.url)
   const tracklist = playlist?.tracks?.items?.map((item: any) => item.track)

   return (
      <div className="overflow-hidden overflow-y-auto max-h-[calc(100vh-32px)] pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex }}
            className="rounded-md grid grid-cols-[auto,1fr] gap-x-8 p-10 relative"
         >
            <div className="flex justify-end flex-col">
               <Avatar src={playlist?.images[0]?.url} size={200} radius={7} />
            </div>
            <div
               className="flex justify-end flex-col"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <div className="flex items-center gap-2">
                  <p>Playlist</p>
               </div>
               <h1 className="text-8xl font-extrabold my-2 line-clamp-1">
                  {playlist.name}
               </h1>
               <div className="flex items-center gap-4">
                  <h2>{playlist.description}</h2>
               </div>
            </div>
         </div>
         {playlist?.tracks?.items?.length > 0 && (
            <div>
               <div className="flex items-center gap-4">
                  <PlayAll playlist={tracklist} />
                  <h2 className="text-2xl font-semibold my-8">
                     Play All Songs
                  </h2>
               </div>
               <table className="w-full">
                  <tbody>
                     {playlist?.tracks?.items?.map((item: any, i: number) => (
                        <TrackListCard
                           index={i}
                           key={item.track.id}
                           track={item.track}
                           playlist={tracklist}
                           added_at={item.added_at}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   )
}
