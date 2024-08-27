'use client'

import { Input } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function SearchForm() {
   const [query, setQuery] = useState('')
   const router = useRouter()

   const handleSearch = useDebouncedCallback((value: string) => {
      router.push(value ? `/search?q=${value}` : '/search')
   }, 1000)

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      handleSearch(e.target.value)
   }

   return (
      <form>
         <Input
            value={query}
            onChange={handleChange}
            leftSection={<IconSearch size={20} />}
            size="lg"
            radius="xl"
            placeholder="What do you want to play?"
         />
      </form>
   )
}
