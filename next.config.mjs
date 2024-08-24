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
      ],
   },
}

export default nextConfig
