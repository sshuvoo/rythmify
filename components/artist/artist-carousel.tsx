'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { RelatedArtistCard } from './related-artist-card'

export default function ArtistCarousel({ artists }: { artists: any[] }) {
   return (
      <Swiper
         spaceBetween={10}
         slidesPerView={2}
         breakpoints={{
            640: {
               slidesPerView: 3,
            },
            768: {
               slidesPerView: 4,
            },
            1024: {
               slidesPerView: 4,
            },
            1280: {
               slidesPerView: 4,
            },
            1536: {
               slidesPerView: 5,
            },
         }}
      >
         {artists.map((artist: any) => (
            <SwiperSlide key={artist.id}>
               <RelatedArtistCard artist={artist} />
            </SwiperSlide>
         ))}
      </Swiper>
   )
}
