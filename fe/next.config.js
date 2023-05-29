/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        imageSizes: [16, 32, 64, 96, 128, 192],
        deviceSizes: [80, 160, 320, 420, 768, 1024, 1280, 1440, 1920, 2560],
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: process.env.NEXT_PUBLIC_CLOUDINARY_ASSET_URL,
                pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
            },
        ],
    },
    compiler: {
        relay: {
            src: './',
            language: 'typescript',
        },
    },
};

module.exports = nextConfig;
