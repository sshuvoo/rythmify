import { getImageColor } from '@/actions/get-image-color'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryCard({ item }: { item: any }) {
   const palette = await getImageColor(item.icons[0].url)
   // h-[190px] w-[340px]
   return (
      <Link
         href={'/search?q=' + encodeURIComponent(item.name.toLowerCase())}
         type="submit"
         className="xl:[190px] relative h-24 overflow-hidden rounded-lg p-4 md:h-36"
         style={{ backgroundColor: palette?.Vibrant?.hex }}
      >
         <h2 className="text-base font-bold text-white md:text-xl xl:text-2xl">
            {item.name}
         </h2>
         <Image
            className="absolute -bottom-5 -right-5 rotate-45 opacity-20"
            width={150}
            height={150}
            src={item.icons[0].url}
            alt=""
         />
      </Link>
   )
}
