import { getImageColor } from '@/actions/get-image-color'
import { serverRedirect } from '@/actions/server-redirect'
import Image from 'next/image'

export default async function CategoryCard({ item }: { item: any }) {
   const palette = await getImageColor(item.icons[0].url)
   return (
      <form
         action={serverRedirect.bind(
            null,
            '/search?q=' + encodeURIComponent(item.name.toLowerCase())
         )}
      >
         <button
            type="submit"
            className="relative h-[190px] w-[340px] overflow-hidden rounded-lg p-4"
            style={{ backgroundColor: palette?.Vibrant?.hex }}
         >
            <h2 className="text-2xl font-bold text-white">{item.name}</h2>
            <Image
               className="absolute -bottom-5 -right-5 rotate-45 opacity-20"
               width={150}
               height={150}
               src={item.icons[0].url}
               alt=""
            />
         </button>
      </form>
   )
}
