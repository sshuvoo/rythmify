'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AlbumCard } from './album-card'

export default function AlbumCarousel({ albums }: { albums: any[] }) {
   return (
      <Swiper
         spaceBetween={10}
         slidesPerView={1}
         navigation={true}
         modules={[Navigation]}
         breakpoints={{
            640: {
               slidesPerView: 2,
            },
            768: {
               slidesPerView: 3,
            },
            1024: {
               slidesPerView: 3,
            },
            1280: {
               slidesPerView: 4,
            },
            1536: {
               slidesPerView: 5,
            },
         }}
      >
         {albums.map((album: any) => (
            <SwiperSlide key={album.id}>
               <AlbumCard album={album} />
            </SwiperSlide>
         ))}
      </Swiper>
   )
}
