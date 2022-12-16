/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['sadegh-akbari.vercel.app'],
  },
}

module.exports = nextConfig
