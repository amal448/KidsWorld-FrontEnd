import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
  // reactCompiler: true,
  // experimental: {
  //   turbopackFileSystemCacheForDev: true
  // }

};

export default nextConfig;
