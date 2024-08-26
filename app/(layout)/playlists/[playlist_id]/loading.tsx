import { WaveLoader } from '@/components/loader/wave-loader'

export default function Loading() {
   return (
      <div className="min-h-[calc(100vh-32px)] flex justify-center items-center">
         <WaveLoader />
      </div>
   )
}
