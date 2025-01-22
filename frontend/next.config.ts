import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'akamai',
    domains: ['locahost'],
    path: '/',
    remotePatterns: [
      {
        protocol: 'http',
        // hostname: 'lh3.googleusercontent.com',
        hostname: 'localhost:5328',
        port: '',
        pathname: '/**', 
      },
    ]
  }
};

export default nextConfig;
