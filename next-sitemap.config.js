const { MongoClient } = require("mongodb");

module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.pokeplan.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 3000,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/dex", "/dex/bases", "/dex/variants", "/team-planner"],
      },
    ],
  },
  additionalPaths: async (config) => {
    let client;
    try {
      // Connect to MongoDB
      client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI, {
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db("pokemons");

      // Query the database for IDs
      const bases = await db
        .collection("pokemons")
        .find({}, { projection: { index: 1 } })
        .toArray();
      const varieities = await db
        .collection("varieties")
        .find({}, { projection: { index: 1 } })
        .toArray();

      // Map the results to paths
      return bases
        .map((base) => ({
          loc: `/dex/bases/${base.index}`,
          changefreq: "daily",
          priority: 0.7,
        }))
        .concat(
          varieities.map((variant) => ({
            loc: `/dex/variants/${variant.index}`,
            changefreq: "daily",
            priority: 0.7,
          }))
        );
    } catch (err) {
      console.error("Error fetching data from MongoDB:", err);
      return [];
    } finally {
      if (client) await client.close(); // Ensure the connection is closed
    }
  },
};
