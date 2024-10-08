import { Paper, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

export function AudiobookCard({ audiobook }: { audiobook: any }) {
   return (
      <Link href={`/audiobooks/${audiobook.id}`}>
         <Paper p={10} radius="md" bg="var(--mantine-color-body)">
            <div className="relative m-auto h-[160px] w-[160px]">
               <Image
                  fill
                  className="rounded-md object-cover"
                  src={audiobook?.images[0]?.url}
                  alt=""
               />
            </div>
            <Text ta="center" mt={5} lineClamp={1} fw={500}>
               {audiobook.name}
            </Text>
         </Paper>
      </Link>
   )
}
