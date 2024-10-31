(async () => {
  const fetch = (await import("node-fetch")).default;
  async function fetchData() {
    try {
      const response = await fetch("https://poke-plan.vercel.app/api/cron", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

      const data = await response.json();
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      process.exit(1);
    }
  }

  fetchData();
})();
