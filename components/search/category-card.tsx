import { getImageColor } from '@/actions/get-image-color'
import Image from 'next/image'

export default async function CategoryCard({ item }: { item: any }) {
   const palette = await getImageColor(item.icons[0].url)
   return (
      <div
         className="w-[340px] h-[190px] p-4 rounded-lg relative overflow-hidden"
         style={{ backgroundColor: palette?.Vibrant?.hex }}
      >
         <h2 className="text-2xl font-bold text-white">{item.name}</h2>
         <Image
            className="rotate-45 absolute -bottom-5 -right-5 opacity-20"
            width={150}
            height={150}
            src={item.icons[0].url}
            alt=""
         />
      </div>
   )
}
