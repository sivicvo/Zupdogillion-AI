import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'akamai',
    path: '/',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgflip.com',
        port: '',
        pathname: '/**', 
      },
    ]
  }
};

export default nextConfig;
