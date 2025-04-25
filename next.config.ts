import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects(){
    return [
      // Redirect padrao
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: true,
      },
      // Wildcard path matching
      // {
      //   source: '/blog/:postId',
      //   destination: '/news/:postId',
      //   permanent: true,
      // },
    ]
  }
};

export default nextConfig;
