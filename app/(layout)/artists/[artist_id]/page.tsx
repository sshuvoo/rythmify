import { checkFollowingArtists } from '@/actions/check-following-artists'
import { getArtistAlbums } from '@/actions/get-artists-album'
import { getArtistsTopTracks } from '@/actions/get-artists-top-tracks'
import { getImageColor } from '@/actions/get-image-color'
import { getMyPlaylists } from '@/actions/get-my-playlists'
import { getRecomendTracks } from '@/actions/get-recomend-tracks'
import { getReletedArtists } from '@/actions/get-related-artists'
import { getSingleArtist } from '@/actions/get-single-artist'
import AlbumCarousel from '@/components/album/album-carousel'
import ArtistCarousel from '@/components/artist/artist-carousel'
import TrackCardLarge from '@/components/artist/track-card-large'
import { FollowButton } from '@/components/button/follow-button'
import PlayAll from '@/components/button/playall-button'
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react'
import Image from 'next/image'

export default async function Artist({
   params: { artist_id },
}: {
   params: { artist_id: string }
}) {
   const artist = await getSingleArtist(artist_id)
   const albums = await getArtistAlbums(artist_id)
   const tracks = await getArtistsTopTracks(artist_id)
   const relatedArtists = await getReletedArtists(artist_id)
   const recomend = await getRecomendTracks(artist_id, artist.genres)
   const palette = await getImageColor(artist?.images[0]?.url)
   const isFollowed = await checkFollowingArtists(artist_id)
   const myPlaylist = await getMyPlaylists()

   return (
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex }}
            className="x:gap-x-8 grid grid-cols-[auto,1fr] gap-x-3 rounded-md p-4 xl:p-8"
         >
            <div className="relative size-24 xl:flex xl:size-[200px] xl:flex-col xl:justify-end">
               <Image
                  fill
                  className="rounded-full object-cover"
                  src={artist?.images[0]?.url}
                  alt=""
               />
            </div>
            <div
               className="flex flex-col justify-end"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <div className="flex items-center gap-2 text-sm xl:text-base">
                  <IconRosetteDiscountCheckFilled className="text-[#1dcaff]" />
                  <p>Verified Artist</p>
               </div>
               <h1 className="my-2 line-clamp-1 text-2xl font-extrabold xl:text-8xl">
                  {artist?.name}
               </h1>
               <h2 className="text-sm xl:text-base">
                  Followers: {artist?.followers?.total}
               </h2>
            </div>
         </div>
         <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-4">
               <PlayAll playlist={tracks?.tracks} />
               <h2 className="text-lg font-semibold xl:text-2xl">
                  Play All Songs
               </h2>
            </div>
            <FollowButton artist_id={artist_id} isFollowed={isFollowed} />
         </div>
         <div className="xl:grid xl:grid-cols-2 xl:gap-8">
            <div>
               <h2 className="my-6 text-xl font-semibold xl:text-2xl">
                  Popular From {artist.name.split(' ').at(-1)}
               </h2>
               <div className="space-y-2 xl:space-y-4">
                  {tracks?.tracks?.length > 0 &&
                     tracks.tracks.map((track: any) => (
                        <TrackCardLarge
                           key={track.id}
                           track={track}
                           myPlaylist={myPlaylist}
                           playlist={tracks?.tracks}
                        />
                     ))}
               </div>
            </div>
            <div>
               <h2 className="my-6 text-xl font-semibold xl:text-2xl">
                  Recomended Tracks
               </h2>
               <div className="space-y-2 xl:space-y-4">
                  {recomend?.tracks?.length > 0 &&
                     recomend.tracks.map((track: any) => (
                        <TrackCardLarge
                           key={track.id}
                           track={track}
                           myPlaylist={myPlaylist}
                           playlist={recomend?.tracks}
                        />
                     ))}
               </div>
            </div>
         </div>
         <div>
            <h2 className="my-8 text-2xl font-medium">Popular Albums</h2>
            <div>
               <AlbumCarousel albums={albums.items} />
            </div>
         </div>
         <div>
            <h2 className="my-8 text-2xl font-medium">Fans Also Like</h2>
            <div>
               <ArtistCarousel artists={relatedArtists.artists} />
            </div>
         </div>
      </div>
   )
}
