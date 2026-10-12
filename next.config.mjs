/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the site has no server features (the form posts straight to
  // EmailJS), so it ships as plain HTML/CSS/JS in out/ and needs no Netlify plugin.
  output: "export",
  images: { unoptimized: true },
  experimental: {
    // Tree-shake icon and animation barrels so only used exports ship.
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
