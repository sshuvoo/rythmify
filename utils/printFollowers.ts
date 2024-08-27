export function printFollowers(count: number = 0) {
   if (count >= 1000000) return Math.round(count / 1000000) + 'M'
   if (count >= 1000) return Math.round(count / 1000) + 'K'
   return count
}
