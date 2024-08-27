import { getArtistAlbums } from '@/actions/get-artists-album'
import { getArtistsTopTracks } from '@/actions/get-artists-top-tracks'
import { getImageColor } from '@/actions/get-image-color'
import { getRecomendTracks } from '@/actions/get-recomend-tracks'
import { getReletedArtists } from '@/actions/get-related-artists'
import { getSingleArtist } from '@/actions/get-single-artist'
import AlbumCarousel from '@/components/album/album-carousel'
import ArtistCarousel from '@/components/artist/artist-carousel'
import TrackPlayButton from '@/components/button/track-play-button'
import { AudioPlayAnimation } from '@/components/track/audio-play-animation'
import { msToDuration } from '@/utils/ms-to-duration'
import { Avatar, Image } from '@mantine/core'
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react'

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
   return (
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex }}
            className="grid grid-cols-[auto,1fr] gap-x-8 rounded-md p-10"
         >
            <div className="flex flex-col justify-end">
               <Avatar src={artist?.images[0]?.url} size={200} />
            </div>
            <div
               className="flex flex-col justify-end"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <div className="flex items-center gap-2">
                  <IconRosetteDiscountCheckFilled className="text-[#1dcaff]" />
                  <p>Verified Artist</p>
               </div>
               <h1 className="my-2 text-8xl font-extrabold">{artist.name}</h1>
               <h2>Followers: {artist.followers.total}</h2>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-8">
            <div>
               <div>
                  <h2 className="my-8 text-2xl font-semibold">
                     Popular From {artist.name.split(' ').at(-1)}
                  </h2>
                  {/* <Link
                     className="flex gap-1 items-center border px-2 py-1 text-sm"
                     href={`/artists/${artist_id}/top-tracks`}
                  >
                     <span>See more</span>
                     <IconChevronRight className="h-4 w-4" />
                  </Link> */}
               </div>
               <div className="space-y-4">
                  {tracks?.tracks?.length > 0 &&
                     tracks.tracks.map((track: any) => (
                        <div
                           key={track.id}
                           className="flex items-center justify-between gap-4 rounded-md p-2 hover:bg-gray-100"
                        >
                           <div className="flex gap-4">
                              <div>
                                 <Image
                                    radius="md"
                                    h={70}
                                    w={70}
                                    src={track?.album?.images[0].url}
                                    alt=""
                                 />
                              </div>
                              <div>
                                 <h3 className="text-xl font-medium">
                                    {track.name}
                                 </h3>
                                 <h3 className="line-clamp-1 text-sm">
                                    {track.artists
                                       .map((artist: any) => artist.name)
                                       .join(' x ')}
                                 </h3>{' '}
                                 <h3 className="text-sm">
                                    {msToDuration(track.duration_ms)}
                                 </h3>
                              </div>
                           </div>
                           <div className="flex items-center gap-4 px-4">
                              <AudioPlayAnimation track_id={track.id} />
                              <TrackPlayButton
                                 playlist={tracks?.tracks}
                                 track_id={track.id}
                              />
                           </div>
                        </div>
                     ))}
               </div>
            </div>
            <div>
               <h2 className="my-8 text-2xl font-semibold">
                  Recomended Tracks
               </h2>
               <div className="space-y-4">
                  {recomend?.tracks?.length > 0 &&
                     recomend.tracks.map((track: any) => (
                        <div
                           key={track.id}
                           className="flex items-center justify-between gap-4 p-2 hover:bg-gray-100"
                        >
                           <div className="flex gap-4">
                              <div className="h-[70px] w-[70px]">
                                 <Image
                                    radius="md"
                                    h={70}
                                    w={70}
                                    src={track?.album?.images[0].url}
                                    alt=""
                                 />
                              </div>
                              <div>
                                 <h3 className="text-xl font-medium">
                                    {track.name}
                                 </h3>
                                 <h3 className="line-clamp-1 text-sm">
                                    {track.artists
                                       .map((artist: any) => artist.name)
                                       .join(' x ')}
                                 </h3>{' '}
                                 <h3 className="text-sm">
                                    {msToDuration(track.duration_ms)}
                                 </h3>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <AudioPlayAnimation track_id={track.id} />
                              <TrackPlayButton
                                 playlist={recomend?.tracks}
                                 track_id={track.id}
                              />
                           </div>
                        </div>
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
