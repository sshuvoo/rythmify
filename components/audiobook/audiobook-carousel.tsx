"use client";

import { Carousel } from "@mantine/carousel";
import { AudiobookCard } from "./audiobook-card";

export default function AudiobookCarousel({ audiobooks }: { audiobooks: any[] }) {
   return (
      <Carousel
         slideGap="md"
         loop
         dragFree
         align="start"
         slidesToScroll={1}
         slideSize={{ base: "100%", sm: "50%", md: "33.333333%", xl: "10%" }}
      >
         {audiobooks.map((audiobook: any) => (
            <Carousel.Slide key={audiobook.id}>
               <AudiobookCard audiobook={audiobook} />
            </Carousel.Slide>
         ))}
      </Carousel>
   );
}
