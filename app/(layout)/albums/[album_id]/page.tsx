import { getAlbum } from '@/actions/get-album'
import { getArtists } from '@/actions/get-artists'
import { getImageColor } from '@/actions/get-image-color'
import { saveAlbumToLibrary } from '@/actions/save-albums'
import AvatarGroup from '@/components/album/avatar-group'
import PlayAll from '@/components/button/playall-button'
import { TrackListCard } from '@/components/track/track-list-card'
import { Avatar, Button } from '@mantine/core'
import { IconHeartPlus } from '@tabler/icons-react'

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
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex }}
            className="relative grid grid-cols-[auto,1fr] gap-x-8 rounded-md p-10"
         >
            <div className="flex flex-col justify-end">
               <Avatar src={album?.images[0]?.url} size={200} radius={7} />
            </div>
            <div
               className="flex flex-col justify-end"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <div className="flex items-center gap-2">
                  <p>Album</p>
               </div>
               <h1 className="my-2 line-clamp-1 text-8xl font-extrabold">
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
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <PlayAll playlist={album?.tracks?.items} />
                     <h2 className="my-8 text-2xl font-semibold">
                        Play All Songs
                     </h2>
                  </div>
                  <form action={saveAlbumToLibrary.bind(null, album_id)}>
                     <Button
                        color="#000000"
                        type="submit"
                        leftSection={<IconHeartPlus />}
                     >
                        Save to Library
                     </Button>
                  </form>
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
