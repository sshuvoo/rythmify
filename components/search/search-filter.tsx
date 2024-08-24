'use client'

import { Chip } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const tags = [
   { title: 'Artists', value: 'artist' },
   { title: 'Playlists', value: 'playlist' },
   { title: 'Songs', value: 'track' },
   { title: 'Albums', value: 'album' },
   { title: 'Shows', value: 'show' },
   { title: 'Audiobooks', value: 'audiobook' },
   { title: 'Episodes', value: 'episode' },
]

export function SearchFilter() {
   const searchParams = useSearchParams()
   const type = searchParams.get('type')
   const [selectedTags, setSelectedTags] = useState<string[]>(
      type ? type.split(',') : []
   )
   const router = useRouter()
   const query = searchParams.get('q')

   const handleChange = (tag: string) => {
      if (query) {
         if (selectedTags.includes(tag)) {
            const filtered = selectedTags.filter((item) => item !== tag)
            setSelectedTags(filtered)
            const queryString =
               filtered.length === 0
                  ? `q=${encodeURIComponent(query)}`
                  : `q=${encodeURIComponent(query)}&type=${filtered.toString()}`
            router.push(`/search?${queryString}`)
         } else {
            const added = [...selectedTags, tag]
            setSelectedTags(added)
            const queryString = `q=${encodeURIComponent(
               query
            )}&type=${added.toString()}`
            router.push(`/search?${queryString}`)
         }
      }
   }

   const handleAll = () => {
      if (selectedTags.length > 0 && query) {
         setSelectedTags([])
         router.push(`/search?q=${encodeURIComponent(query)}`)
      }
   }

   return (
      query && (
         <div className="flex mt-4 gap-2 flex-wrap">
            <Chip
               onChange={handleAll}
               checked={selectedTags.length === 0}
               color="teal"
               size="sm"
            >
               All
            </Chip>
            {tags.map((tag) => (
               <Chip
                  onChange={() => handleChange(tag.value)}
                  checked={selectedTags.includes(tag.value)}
                  key={tag.value}
                  color="teal"
                  size="sm"
               >
                  {tag.title}
               </Chip>
            ))}
         </div>
      )
   )
}
