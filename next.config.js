/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compilerOptions: {
    baseUrl: './',
    paths: {
      'components/*': ['src/components/*']
    }
  },
  images: {
    domains: ['images.pexels.com', 'i.ytimg.com']
  }
};

module.exports = nextConfig;
