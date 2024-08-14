import { getArtistAlbums } from "@/actions/get-artists-album";
import { getSingleArtist } from "@/actions/get-single-artist";
import AlbumCarousel from "@/components/album/album-carousel";
import { ArtistCardImage } from "@/components/artist/artist-card-image";
import "@mantine/carousel/styles.css";

export default async function Artist({
   params: { artist_id },
}: {
   params: { artist_id: string };
}) {
   const artist = await getSingleArtist(artist_id);
   const albums = await getArtistAlbums(artist_id);

   return (
      <div>
         <div className="p-4">
            <div className="grid grid-cols-[400px,1fr] gap-4">
               <ArtistCardImage artist={artist} />
               <div className="overflow-hidden">
                  <AlbumCarousel albums={albums.items} />
               </div>
            </div>
         </div>
      </div>
   );
}
