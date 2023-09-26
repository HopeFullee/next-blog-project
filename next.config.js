/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  env: {
    GITHUB_APP_ID: process.env.GITHUB_APP_ID,
    GITHUB_APP_SECRET: process.env.GITHUB_APP_SECRET,
  },
};
