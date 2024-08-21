'use client'

import { Input } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export default function SearchForm() {
   const [query, setQuery] = useState('')
   const router = useRouter()
   const inputRef = useRef<HTMLInputElement | null>(null)

   const handleSearch = useDebouncedCallback((value: string) => {
      router.push(value ? `/search?q=${value}` : '/search')
   }, 1000)

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      handleSearch(e.target.value)
   }

   useEffect(() => {
      if (inputRef.current instanceof HTMLInputElement) {
         inputRef.current.focus()
      }
   }, [])

   return (
      <form>
         <Input
            ref={inputRef}
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
