/** @type {import('next').NextConfig} */
const isDeployGithubPages = process.env.DEPLOY_GITHUB_PAGES != undefined;

const nextConfig = {
  reactStrictMode: true,
  env: {
    isDeployGithubPages: isDeployGithubPages,
  },
  basePath: isDeployGithubPages ? '/LineDCHackathon2023Frontend' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
