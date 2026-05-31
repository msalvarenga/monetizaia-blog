/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'http',  hostname: 'localhost' },
      { protocol: 'https', hostname: 'monetizaia.com.br' },
      { protocol: 'http',  hostname: '77.37.127.180' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/wp-json/:path*',
        destination: 'http://77.37.127.180/wp-json/:path*',
      },
      {
        source: '/wp-content/:path*',
        destination: 'http://77.37.127.180/wp-content/:path*',
      },
    ]
  },
}
module.exports = nextConfig
