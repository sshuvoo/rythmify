'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PlaylistCard } from './playlist-card'

export function PlaylistCarousel({ playlists }: { playlists: any[] }) {
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
         {playlists.map((playlist: any) => (
            <SwiperSlide key={playlist.id}>
               <PlaylistCard playlist={playlist} />
            </SwiperSlide>
         ))}
      </Swiper>
   )
}
