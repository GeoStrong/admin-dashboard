/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "storage.googleapis.com",
      "randomuser.me",
      "picsum.photos",
      "api.json-generator.com",
      "images.unsplash.com",
      "i.pravatar.cc",
      "fakestoreapi.com"
    ],
  },
  turbopack: {
    rules: {
      "*.woff2": ["asset"],
      "*.woff": ["asset"],
      "*.ttf": ["asset"],
      "*.eot": ["asset"],
      "*.otf": ["asset"]
    }
  }
};

export default nextConfig;
