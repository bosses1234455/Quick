/** @type {import('next').NextConfig} */
const nextConfig = {
    
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups' // Less restrictive option
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp' // Optional, but may help
          }
        ],
    
};

export default nextConfig;
