import { checkMyPlaylist } from '@/actions/check-my-playlist'
import { getImageColor } from '@/actions/get-image-color'
import { getPlaylist } from '@/actions/get-playlist'
import { CreatePlaylistButton } from '@/components/button/create-playlist-button'
import PlayAll from '@/components/button/playall-button'
import { SettingsMenu } from '@/components/playlist/settings-menu'
import { TrackListCard } from '@/components/track/track-list-card'
import { Avatar } from '@mantine/core'

export default async function Playlist({
   params: { playlist_id },
}: {
   params: { playlist_id: string }
}) {
   const playlist = await getPlaylist(playlist_id)
   const palette =
      playlist?.images &&
      playlist?.images[0]?.url &&
      (await getImageColor(playlist?.images[0]?.url))
   const tracklist = playlist?.tracks?.items?.map((item: any) => item.track)
   const isMyPlaylist = await checkMyPlaylist(playlist_id)

   return (
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex || '#000000' }}
            className="relative grid grid-cols-[auto,1fr] gap-x-8 rounded-md p-10"
         >
            <div className="flex flex-col justify-end">
               <Avatar
                  src={playlist?.images && playlist.images[0]?.url}
                  size={200}
                  radius={7}
               />
            </div>
            <div
               className="flex flex-col justify-end"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <div className="flex items-center gap-2">
                  <p>Playlist</p>
               </div>
               <h1 className="my-2 line-clamp-1 text-8xl font-extrabold">
                  {playlist.name}
               </h1>
               <div className="flex items-center gap-4">
                  <h2>{playlist.description}</h2>
               </div>
            </div>
         </div>
         <div>
            <div className="my-4 flex items-center justify-between">
               <div>
                  {playlist?.tracks?.items?.length > 0 && (
                     <div className="flex items-center gap-4">
                        <PlayAll playlist={tracklist} />
                        <h2 className="my-4 text-2xl font-semibold">
                           Play All Songs
                        </h2>
                     </div>
                  )}
               </div>
               <div className="flex items-center gap-2">
                  <SettingsMenu isMyPlaylist={isMyPlaylist} playlist={playlist} />
                  <CreatePlaylistButton />
               </div>
            </div>

            {playlist?.tracks?.items?.length > 0 && (
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
            )}
         </div>
      </div>
   )
}
