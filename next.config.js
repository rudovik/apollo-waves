const TerserPlugin = require("terser-webpack-plugin")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  webpack(config) {
    if (config.mode === "production") {
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              keep_classnames: true,
            },
          }),
        ],
      }
    }
    return config
  },
}

module.exports = nextConfig
