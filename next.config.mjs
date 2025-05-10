/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // ✅ Allow Cloudinary & still allow local by default
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
  };
  
  export default nextConfig;