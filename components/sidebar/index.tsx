import { getFeaturedPlaylists } from '@/actions/get-featured-playlists'
import { getFollowedArtists } from '@/actions/get-followed-artists'
import { getMyPlaylists } from '@/actions/get-my-playlists'
import { getSavedAlbums } from '@/actions/get-saved-albums'
import { IconHomeFilled, IconPlaylist, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { Console } from '../console'
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
      <div className="w-[420px] space-y-4">
         <Console data={myPlaylists} />
         <div className="space-y-4 rounded-md border border-gray-200 px-4 py-5">
            <Link
               className="flex items-center gap-3 text-base font-bold"
               href={'/'}
            >
               <IconHomeFilled />
               <span>Home</span>
            </Link>
            <Link
               className="flex items-center gap-3 text-base font-bold"
               href={'/search'}
            >
               <IconSearch />
               <span>Search</span>
            </Link>
         </div>
         <div className="rounded-md border border-gray-200 px-4 py-5">
            <div className="flex justify-between">
               <div className="flex items-center gap-3 text-base font-bold">
                  <IconPlaylist />
                  <span>Your Music Library</span>
               </div>
               <div>
                  <CreatePlaylistIcon />
               </div>
            </div>
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
               <div>
                  <div className="my-4 flex items-center gap-3 text-base font-bold">
                     <span>My Playlist</span>
                  </div>
                  <div>
                     {myPlaylists?.items?.map((playlist: any) => (
                        <SidebarPlaylistCard
                           key={playlist.id}
                           playlist={playlist}
                        />
                     ))}
                  </div>
               </div>
               <div>
                  <div className="my-4 flex items-center gap-3 text-base font-bold">
                     <span>Followed Artists</span>
                  </div>
                  <div>
                     {followedArtists?.artists?.items?.map((item: any) => (
                        <SidebarArtistCard key={item.id} artist={item} />
                     ))}
                  </div>
               </div>
               <div>
                  <div className="my-4 flex items-center gap-3 text-base font-bold">
                     <span>Saved Albums</span>
                  </div>
                  <div>
                     {savedAlbums?.items?.map((item: any) => (
                        <SidebarAlbumCard
                           key={item.album.id}
                           album={item.album}
                        />
                     ))}
                  </div>
               </div>
               <div>
                  <div className="my-4 flex items-center gap-3 text-base font-bold">
                     <span>Popular</span>
                  </div>
                  <div>
                     {popularPlaylists.playlists.items.map((playlist: any) => (
                        <SidebarPlaylistCard
                           key={playlist.id}
                           playlist={playlist}
                        />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
