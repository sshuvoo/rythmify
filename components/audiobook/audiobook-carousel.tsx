'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AudiobookCard } from './audiobook-card'

export default function AudiobookCarousel({
   audiobooks,
}: {
   audiobooks: any[]
}) {
   return (
      <Swiper
         spaceBetween={10}
         slidesPerView={2}
         navigation={true}
         modules={[Navigation]}
         breakpoints={{
            640: {
               slidesPerView: 3,
            },
            768: {
               slidesPerView: 3,
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
         {audiobooks.map((audiobook: any) => (
            <SwiperSlide key={audiobook.id}>
               <AudiobookCard audiobook={audiobook} />
            </SwiperSlide>
         ))}
      </Swiper>
   )
}
