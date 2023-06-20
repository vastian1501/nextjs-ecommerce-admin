/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nextjs-ecommerce-vastian.s3.eu-north-1.amazonaws.com', 'lh3.googleusercontent.com', 'acs.amazonaws.com'],
    remotePatterns: [{ protocol: "https", hostname: "**.amazonaws.com", },],
  }

}

module.exports = nextConfig