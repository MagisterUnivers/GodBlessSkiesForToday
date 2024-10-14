const isProd = process.env.NODE_ENV === 'production'

const remotePatterns = [
  {
    hostname: 'localhost',
    port: ''
  },
  {
    hostname: 'randomuser.me',
    port: ''
  }
]

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  images: {
    remotePatterns
  },
  assetPrefix: isProd ? process.env.PUBLIC_URL : undefined
}

export default nextConfig;
