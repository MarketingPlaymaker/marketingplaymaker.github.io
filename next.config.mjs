/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Tree-shake icon and animation barrels so only used exports ship.
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
