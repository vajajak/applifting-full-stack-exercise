/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        imageSizes: [16, 32, 64, 96, 128, 192],
        deviceSizes: [80, 160, 320, 420, 768, 1024, 1280, 1440, 1920, 2560],
        remotePatterns: [
            {
                protocol: 'http',
                port: '3000',
                hostname: 'host.docker.internal',
                pathname: '/assets/**',
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
