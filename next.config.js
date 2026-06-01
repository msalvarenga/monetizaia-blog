/** @type {import('next').NextConfig} */
const WP_SERVER = 'https://khaki-anteater-104372.hostingersite.com'

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'https', hostname: 'monetizaia.com.br' },
      { protocol: 'https', hostname: 'khaki-anteater-104372.hostingersite.com' },
      { protocol: 'http', hostname: '77.37.127.180' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return [
      { source: '/wp-json/:path*', destination: `${WP_SERVER}/wp-json/:path*` },
      { source: '/wp-admin/:path*', destination: `${WP_SERVER}/wp-admin/:path*` },
      { source: '/wp-admin', destination: `${WP_SERVER}/wp-admin/` },
      { source: '/wp-login.php', destination: `${WP_SERVER}/wp-login.php` },
      { source: '/wp-content/:path*', destination: `${WP_SERVER}/wp-content/:path*` },
      { source: '/xmlrpc.php', destination: `${WP_SERVER}/xmlrpc.php` },
    ]
  },
}
module.exports = nextConfig
