/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 't.scdn.co',
         },
         {
            protocol: 'https',
            hostname: 'charts-images.scdn.co',
         },
         {
            protocol: 'https',
            hostname: 'i.scdn.co',
         },
         {
            protocol: 'https',
            hostname: 'image-cdn-ak.spotifycdn.com',
         },
         {
            protocol: 'https',
            hostname: 'image-cdn-fa.spotifycdn.com',
         },
      ],
   },
}

export default nextConfig
