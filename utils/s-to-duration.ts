export const sToDuration = (s?: number) => {
   if (!s) return '00:00'
   const minutes = Math.trunc(s / 60)
   const seconds = Math.trunc(s) - minutes * 60
   return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
   }`
}
