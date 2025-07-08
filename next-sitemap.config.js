// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  generateRobotsTxt: true, // generates both sitemap and robots.txt
};