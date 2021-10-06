/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    apiBaseURL: process.env.API_BASE_URL,
    openGraphBaseURL: process.env.OG_BASE_URL
  }
}
