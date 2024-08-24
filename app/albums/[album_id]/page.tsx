import { getAlbum } from '@/actions/get-album'
import { getArtists } from '@/actions/get-artists'
import { getImageColor } from '@/actions/get-image-color'
import AvatarGroup from '@/components/album/avatar-group'
import PlayAll from '@/components/button/playall-button'
import { TrackListCard } from '@/components/track/track-list-card'
import { Avatar } from '@mantine/core'

export default async function Album({
   params: { album_id },
}: {
   params: { album_id: string }
}) {
   const album = await getAlbum(album_id)
   const palette = await getImageColor(album?.images[0]?.url)
   const artists = await getArtists(
      album?.artists?.map((artist: any) => artist.id).join(',')
   )

   return (
      <div className="overflow-hidden overflow-y-auto max-h-[calc(100vh-32px)] pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex }}
            className="rounded-md grid grid-cols-[auto,1fr] gap-x-8 p-10 relative"
         >
            <div className="flex justify-end flex-col">
               <Avatar src={album?.images[0]?.url} size={200} radius={7} />
            </div>
            <div
               className="flex justify-end flex-col"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <div className="flex items-center gap-2">
                  <p>Album</p>
               </div>
               <h1 className="text-8xl font-extrabold my-2 line-clamp-1">
                  {album.name}
               </h1>
               <div className="flex items-center gap-4">
                  <AvatarGroup artists={artists.artists} />
                  <h2>
                     {artists.artists
                        .map((artist: any) => artist.name)
                        .join(' x ')}
                     {' . '}
                     {album.total_tracks} Songs
                  </h2>
               </div>
            </div>
         </div>
         {album?.tracks?.items?.length > 0 && (
            <div>
               <div className="flex items-center gap-4">
                  <PlayAll playlist={album?.tracks?.items} />
                  <h2 className="text-2xl font-semibold my-8">
                     Play All Songs
                  </h2>
               </div>
               <table className="w-full">
                  <tbody>
                     {album?.tracks?.items?.map((track: any, i: number) => (
                        <TrackListCard
                           index={i}
                           key={track.id}
                           track={track}
                           playlist={album?.tracks?.items}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   )
}
