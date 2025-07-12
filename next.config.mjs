/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "storage.googleapis.com",
      "randomuser.me",
      "picsum.photos",
      "api.json-generator.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
