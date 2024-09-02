import { checkSavedAlbum } from '@/actions/check-saved-albums'
import { getAlbum } from '@/actions/get-album'
import { getArtists } from '@/actions/get-artists'
import { getImageColor } from '@/actions/get-image-color'
import { getMyPlaylists } from '@/actions/get-my-playlists'
import { AlbumTrackCard } from '@/components/album/album-track-card'
import AvatarGroup from '@/components/album/avatar-group'
import PlayAll from '@/components/button/playall-button'
import { SaveAlbumButton } from '@/components/button/save-album-button'
import Image from 'next/image'

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
   const isSaved = await checkSavedAlbum(album_id)
   const myPlaylists = await getMyPlaylists()

   return (
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex }}
            className="x:gap-x-8 grid grid-cols-[auto,1fr] gap-x-3 rounded-md p-4 xl:p-8"
         >
            <div className="relative size-24 xl:flex xl:size-[200px] xl:flex-col xl:justify-end">
               <Image
                  fill
                  className="object-cover"
                  src={album?.images[0]?.url}
                  alt=""
               />
            </div>
            <div
               className="flex flex-col justify-end"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <p className="text-sm xl:text-base">Album</p>
               <h1 className="my-2 line-clamp-1 text-2xl font-extrabold xl:text-8xl">
                  {album.name}
               </h1>
               <div className="flex items-center gap-4">
                  <div className="hidden xl:block">
                     <AvatarGroup artists={artists.artists} />
                  </div>
                  <h2 className="text-sm xl:text-base">
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
                     <h2 className="my-8 text-lg font-semibold xl:text-2xl">
                        Play All Songs
                     </h2>
                  </div>
                  <SaveAlbumButton isSaved={isSaved} album_id={album_id} />
               </div>
               <table className="w-full">
                  <tbody>
                     {album?.tracks?.items?.map((track: any, i: number) => (
                        <AlbumTrackCard
                           index={i}
                           key={track.id}
                           track={track}
                           playlist={album?.tracks?.items}
                           myPlaylists={myPlaylists || []}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   )
}
