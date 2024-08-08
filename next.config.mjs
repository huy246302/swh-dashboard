import pkg from 'next';
const { images } = pkg;

const nextConfig = {
  images: {
    domains: ['cdn.theathletic.com', 'archive.ph'], // Add your image domains here
  },
};

export default nextConfig;
