/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://murid.co.uk',
  generateRobotsTxt: true, // ✅ create /robots.txt automatically
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*'], // exclude admin dashboard if private
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};