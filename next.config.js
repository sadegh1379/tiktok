/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'sadegh-akbari.vercel.app',
      'lh3.googleusercontent.com'
    ],
  },
}

module.exports = nextConfig
