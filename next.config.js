/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  env: {
    GITHUB_APP_ID: process.env.GITHUB_APP_ID,
    GITHUB_APP_SECRET: process.env.GITHUB_APP_SECRET,
    GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
    GOOGLE_APP_SECRET: process.env.GOOGLE_APP_SECRET,
  },
};
