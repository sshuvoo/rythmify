'use server'

import Vibrant from 'node-vibrant'

export const getImageColor = async (url?: string) => {
   if (!url) return null
   try {
      const v = new Vibrant(url)
      const palette = await v.getPalette()
      return palette
   } catch (error) {
      return null
   }
}
