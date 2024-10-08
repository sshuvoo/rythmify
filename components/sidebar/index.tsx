import { getFeaturedPlaylists } from '@/actions/get-featured-playlists'
import { getFollowedArtists } from '@/actions/get-followed-artists'
import { getMyPlaylists } from '@/actions/get-my-playlists'
import { getSavedAlbums } from '@/actions/get-saved-albums'
import { IconHomeFilled, IconPlaylist, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import CreatePlaylistIcon from './create-playlist-icon'
import { SidebarAlbumCard } from './sidebar-album-card'
import { SidebarArtistCard } from './sidebar-artist-card'
import { SidebarPlaylistCard } from './sidebar-playlist-card'

export default async function Sidebar() {
   const savedAlbums = await getSavedAlbums()
   const popularPlaylists = await getFeaturedPlaylists()
   const followedArtists = await getFollowedArtists()
   const myPlaylists = await getMyPlaylists()

   return (
      <div className="w-fit space-y-2 lg:w-[300px] xl:w-[350px] xl:space-y-4 2xl:w-[420px]">
         <div className="space-y-4 rounded-md border border-gray-200 px-2 py-5 lg:px-4">
            <Link
               className="flex items-center gap-3 text-base font-bold"
               href={'/'}
            >
               <IconHomeFilled title="Home" />
               <span className="hidden lg:inline-block">Home</span>
            </Link>
            <Link
               className="flex items-center gap-3 text-base font-bold"
               href={'/search'}
            >
               <IconSearch />
               <span className="hidden lg:inline-block">Search</span>
            </Link>
         </div>
         <div className="rounded-md border border-gray-200 px-2 py-5 lg:px-4">
            <div className="flex flex-col justify-between gap-2 lg:flex-row">
               <div className="text-base font-bold lg:flex lg:items-center lg:gap-3">
                  <IconPlaylist />
                  <span className="hidden lg:inline-block">
                     Your Music Library
                  </span>
               </div>
               <div>
                  <CreatePlaylistIcon />
               </div>
            </div>
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide lg:scrollbar-default">
               {myPlaylists?.items?.length > 0 && (
                  <div>
                     <div className="hidden text-base font-bold lg:my-4 lg:block">
                        <span>My Playlist</span>
                     </div>
                     <div className="space-y-2">
                        {myPlaylists?.items?.map((playlist: any) => (
                           <SidebarPlaylistCard
                              key={playlist.id}
                              playlist={playlist}
                           />
                        ))}
                     </div>
                  </div>
               )}
               {followedArtists?.artists?.items?.length > 0 && (
                  <div>
                     <div className="hidden text-base font-bold lg:my-4 lg:block">
                        <span>Followed Artists</span>
                     </div>
                     <div className="mt-2 space-y-2">
                        {followedArtists?.artists?.items?.map((item: any) => (
                           <SidebarArtistCard key={item.id} artist={item} />
                        ))}
                     </div>
                  </div>
               )}
               {savedAlbums?.items?.length > 0 && (
                  <div>
                     <div className="hidden text-base font-bold lg:my-4 lg:block">
                        <span>Saved Albums</span>
                     </div>
                     <div className="mt-2 space-y-2">
                        {savedAlbums?.items?.map((item: any) => (
                           <SidebarAlbumCard
                              key={item.album.id}
                              album={item.album}
                           />
                        ))}
                     </div>
                  </div>
               )}
               {popularPlaylists.playlists.items.length > 0 && (
                  <div>
                     <div className="hidden text-base font-bold lg:my-4 lg:block">
                        <span>Popular</span>
                     </div>
                     <div className="mt-2 space-y-2">
                        {popularPlaylists.playlists.items.map(
                           (playlist: any) => (
                              <SidebarPlaylistCard
                                 key={playlist.id}
                                 playlist={playlist}
                              />
                           )
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
