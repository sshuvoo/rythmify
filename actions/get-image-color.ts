'use server'

import Vibrant from 'node-vibrant'

export const getImageColor = async (url: string) => {
   try {
      const v = new Vibrant(url)
      const palette = await v.getPalette()
      return palette
   } catch (error) {
      return null
   }
}
