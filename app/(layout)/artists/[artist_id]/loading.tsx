import { WaveLoader } from '@/components/loader/wave-loader'

export default function Loading() {
   return (
      <div className="flex min-h-[calc(100vh-106px)] items-center justify-center">
         <WaveLoader />
      </div>
   )
}
