import { getArtistAlbums } from "@/actions/get-artists-album";
import { getArtistsTopTracks } from "@/actions/get-artists-top-tracks";
import { getReletedArtists } from "@/actions/get-related-artists";
import { getSingleArtist } from "@/actions/get-single-artist";
import { playSingleTrack } from "@/actions/play-track";
import AlbumCarousel from "@/components/album/album-carousel";
import { ArtistCardImage } from "@/components/artist/artist-card-image";
import { RelatedArtistCard } from "@/components/artist/related-artist-card";
import TrackPlayButton from "@/components/button/track-play-button";
import { msToDuration } from "@/utils/ms-to-duration";
import "@mantine/carousel/styles.css";
import { Image, Text } from "@mantine/core";
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";

export default async function Artist({
   params: { artist_id },
}: {
   params: { artist_id: string };
}) {
   const artist = await getSingleArtist(artist_id);
   const albums = await getArtistAlbums(artist_id);
   const tracks = await getArtistsTopTracks(artist_id);
   const relatedArtists = await getReletedArtists(artist_id);
   console.log(relatedArtists.artists[0]);
   return (
      <div>
         <div className="p-4">
            <div className="grid grid-cols-[400px,1fr] gap-4">
               <ArtistCardImage artist={artist} />
               <div className="overflow-hidden">
                  <AlbumCarousel albums={albums.items} />
                  <div className="grid grid-cols-[1fr,500px] gap-4">
                     <div>
                        <h2 className="text-2xl font-medium my-8">
                           Popular Tracks
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
                                       <h3 className="text-sm">
                                          {track.artists
                                             .map((artist: any) => artist.name)
                                             .join(" x ")}
                                       </h3>{" "}
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
                        <h2 className="text-2xl font-medium my-8">
                           Fans Also Like
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                           {relatedArtists.artists.map((artist: any) => (
                              <RelatedArtistCard
                                 key={artist.id}
                                 artist={artist}
                              />
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
