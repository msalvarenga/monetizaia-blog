/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'monetizaia.com.br',
      },
      {
        protocol: 'https',
        hostname: 'khaki-anteater-104372.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
  },
}

module.exports = nextConfig
