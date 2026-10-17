const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["your-image-domain.com"], // Add allowed image domains
  },
  compress: true, // Enable gzip compression
};

module.exports = nextConfig;
