import { getArtistAlbums } from '@/actions/get-artists-album'
import { getArtistsTopTracks } from '@/actions/get-artists-top-tracks'
import { getImageColor } from '@/actions/get-image-color'
import { getRecomendTracks } from '@/actions/get-recomend-tracks'
import { getReletedArtists } from '@/actions/get-related-artists'
import { getSingleArtist } from '@/actions/get-single-artist'
import AlbumCarousel from '@/components/album/album-carousel'
import { ArtistCardImage } from '@/components/artist/artist-card-image'
import RelatedArtistCarousel from '@/components/artist/related-artist-carousel'
import TrackPlayButton from '@/components/button/track-play-button'
import { msToDuration } from '@/utils/ms-to-duration'
import '@mantine/carousel/styles.css'
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
   const palette = await getImageColor(artist?.images[0]?.url)
   const recomend = await getRecomendTracks(artist_id, artist.genres)
   return (
      <div>
         <div className="p-4">
            <div className="grid grid-cols-[400px,1fr] gap-4">
               <ArtistCardImage artist={artist} />
               <div className="overflow-hidden">
                  <div
                     style={{ backgroundColor: palette?.DarkMuted?.hex }}
                     className="h-[340px] rounded-md grid grid-cols-[auto,1fr] gap-x-8 p-10"
                  >
                     <div className="flex justify-end flex-col">
                        <Avatar src={artist?.images[0]?.url} size={200} />
                     </div>
                     <div
                        className="flex justify-end flex-col"
                        style={{
                           color:
                              palette?.DarkMuted?.titleTextColor || '#ffffff',
                        }}
                     >
                        <div className="flex items-center gap-2">
                           <IconRosetteDiscountCheckFilled className="text-[#1dcaff]" />
                           <p>Verified Artist</p>
                        </div>
                        <h1 className="text-8xl font-extrabold my-2">
                           {artist.name}
                        </h1>
                        <h2>Followers: {artist.followers.total}</h2>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <h2 className="text-2xl font-semibold my-8">
                           Popular From {artist.name.split(' ').at(-1)}
                        </h2>
                        <div className="space-y-4">
                           {tracks.tracks.map((track: any) => (
                              <div
                                 key={track.id}
                                 className="flex gap-4 justify-between items-center hover:bg-gray-100 p-2"
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
                                       <h3 className="text-sm line-clamp-1">
                                          {track.artists
                                             .map((artist: any) => artist.name)
                                             .join(' x ')}
                                       </h3>{' '}
                                       <h3 className="text-sm">
                                          {msToDuration(track.duration_ms)}
                                       </h3>
                                    </div>
                                 </div>
                                 <TrackPlayButton id={track.id} />
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h2 className="text-2xl font-semibold my-8">
                           Recomended Tracks
                        </h2>
                        <div className="space-y-4">
                           {recomend.tracks.map((track: any) => (
                              <div
                                 key={track.id}
                                 className="flex gap-4 justify-between items-center hover:bg-gray-100 p-2"
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
                                       <h3 className="text-sm line-clamp-1">
                                          {track.artists
                                             .map((artist: any) => artist.name)
                                             .join(' x ')}
                                       </h3>{' '}
                                       <h3 className="text-sm">
                                          {msToDuration(track.duration_ms)}
                                       </h3>
                                    </div>
                                 </div>
                                 <TrackPlayButton id={track.id} />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div>
                     <h2 className="text-2xl font-medium my-8">
                        Popular Albums
                     </h2>
                     <div>
                        <AlbumCarousel albums={albums.items} />
                     </div>
                  </div>
                  <div>
                     <h2 className="text-2xl font-medium my-8">
                        Fans Also Like
                     </h2>
                     <RelatedArtistCarousel artists={relatedArtists.artists} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
