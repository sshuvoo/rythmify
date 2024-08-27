"use client";

import { Carousel } from "@mantine/carousel";
import { AlbumCard } from "./album-card";

export default function AlbumCarousel({ albums }: { albums: any[] }) {
   return (
      <Carousel
         slideGap="md"
         loop
         dragFree
         align="start"
         slidesToScroll={1}
         slideSize={{ base: "100%", sm: "50%", md: "33.333333%", xl: "20%" }}
      >
         {albums.map((album: any) => (
            <Carousel.Slide key={album.id}>
               <AlbumCard album={album} />
            </Carousel.Slide>
         ))}
      </Carousel>
   );
}
