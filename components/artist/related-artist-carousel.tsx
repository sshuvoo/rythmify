"use client";

import { Carousel } from "@mantine/carousel";
import { RelatedArtistCard } from "./related-artist-card";

export default function RelatedArtistCarousel({ artists }: { artists: any[] }) {
   return (
      <Carousel
         slideGap="md"
         loop
         dragFree
         align="start"
         slidesToScroll={1}
         slideSize={{ base: "100%", sm: "50%", md: "33.333333%", xl: "20%" }}
      >
         {artists.map((artist: any) => (
            <Carousel.Slide key={artist.id}>
               <RelatedArtistCard artist={artist} />
            </Carousel.Slide>
         ))}
      </Carousel>
   );
}
