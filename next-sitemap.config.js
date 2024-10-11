module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.poke-plan.vercel.app",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 3000,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/dex/bases", "/dex/variants", "/team-planner"],
      },
    ],
  },
};
