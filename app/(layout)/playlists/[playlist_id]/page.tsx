import { checkMyPlaylist } from '@/actions/check-my-playlist'
import { getImageColor } from '@/actions/get-image-color'
import { getPlaylist } from '@/actions/get-playlist'
import { CreatePlaylistButton } from '@/components/button/create-playlist-button'
import PlayAll from '@/components/button/playall-button'
import { SettingsMenu } from '@/components/playlist/settings-menu'
import { TrackListCard } from '@/components/track/track-list-card'
import Image from 'next/image'

export default async function Playlist({
   params: { playlist_id },
}: {
   params: { playlist_id: string }
}) {
   const playlist = await getPlaylist(playlist_id)
   const palette = await getImageColor(
      playlist?.images && playlist?.images[0]?.url && playlist?.images[0]?.url
   )
   const tracklist = playlist?.tracks?.items?.map((item: any) => item.track)
   const isMyPlaylist = await checkMyPlaylist(playlist_id)

   return (
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex || '#000000' }}
            className="x:gap-x-8 grid grid-cols-[auto,1fr] gap-x-3 rounded-md p-4 xl:p-8"
         >
            <div className="relative size-24 xl:flex xl:size-[200px] xl:flex-col xl:justify-end">
               <Image
                  fill
                  className="object-cover"
                  src={playlist?.images && playlist.images[0]?.url}
                  alt=""
               />
            </div>
            <div
               className="flex flex-col justify-end"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <p className="text-sm xl:text-base">Playlist</p>
               <h1 className="my-2 line-clamp-1 text-2xl font-extrabold xl:text-8xl">
                  {playlist.name}
               </h1>
               <h2 className="line-clamp-1 text-sm xl:text-base">
                  {playlist.description}
               </h2>
            </div>
         </div>
         <div>
            <div className="my-4 flex items-center justify-between">
               <div>
                  {playlist?.tracks?.items?.length > 0 && (
                     <div className="flex items-center gap-4">
                        <PlayAll playlist={tracklist} />
                        <h2 className="hidden text-lg font-semibold xl:block xl:text-2xl">
                           Play All Songs
                        </h2>
                     </div>
                  )}
               </div>
               <div className="flex items-center gap-2">
                  <SettingsMenu
                     isMyPlaylist={isMyPlaylist}
                     playlist={playlist}
                  />
                  <CreatePlaylistButton />
               </div>
            </div>

            {playlist?.tracks?.items?.length > 0 && (
               <table className="w-full">
                  <tbody>
                     {playlist?.tracks?.items?.map((item: any, i: number) => (
                        <TrackListCard
                           isMyPlaylist={isMyPlaylist}
                           snapshot_id={playlist.snapshot_id}
                           playlist_id={playlist_id}
                           index={i}
                           key={item.track.id}
                           track={item.track}
                           playlist={tracklist}
                           added_at={item.added_at}
                        />
                     ))}
                  </tbody>
               </table>
            )}
         </div>
      </div>
   )
}
