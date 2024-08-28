import { Header } from '@/components/header'
import { Player } from '@/components/player'
import Sidebar from '@/components/sidebar'

interface Children {
   children: React.ReactNode
}

export default function Layout({ children }: Children) {
   return (
      <div>
         <Header />
         <div className="grid grid-cols-[auto,1fr] gap-4 p-4">
            <Sidebar />
            {children}
         </div>
         <Player />
      </div>
   )
}
