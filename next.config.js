/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['flowbite.com', 'images.unsplash.com', 'shorturl.at'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
