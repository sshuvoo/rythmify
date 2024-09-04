import { getImageColor } from '@/actions/get-image-color'
import { getMyPlaylists } from '@/actions/get-my-playlists'
import { auth } from '@/auth'
import { PlaylistCarousel } from '@/components/playlist/playlists-carousel'
import avatar from '@/public/profile-user.png'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Profile() {
   const session = await auth()
   if (!session) redirect('/authentication?redirect_to=/profile')

   const palette = await getImageColor(session.user.image!)
   const myPlaylist = await getMyPlaylists()

   return (
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto pb-32">
         <div
            style={{ backgroundColor: palette?.DarkMuted?.hex }}
            className="x:gap-x-8 grid grid-cols-[auto,1fr] gap-x-3 rounded-md p-4 xl:p-8"
         >
            <div className="relative size-24 xl:flex xl:size-[200px] xl:flex-col xl:justify-end">
               <Image
                  fill
                  className="rounded-full object-cover"
                  src={session.user.image || avatar}
                  alt=""
               />
            </div>
            <div
               className="flex flex-col justify-end"
               style={{
                  color: palette?.DarkMuted?.titleTextColor || '#ffffff',
               }}
            >
               <div className="text-sm xl:text-base">
                  <p>Profile</p>
               </div>
               <h1 className="my-2 line-clamp-1 text-2xl font-extrabold xl:text-8xl">
                  {session.user.name}
               </h1>
            </div>
         </div>
         <div>
            <h2 className="my-4 text-xl font-semibold xl:text-2xl">
               My Playlists
            </h2>
            <PlaylistCarousel playlists={myPlaylist?.items || []} />
         </div>
      </div>
   )
}
