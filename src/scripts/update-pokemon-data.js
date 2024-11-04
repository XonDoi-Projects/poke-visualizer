const fetch = require("node-fetch");

async function main() {
  try {
    const response = await fetch(`https://poke-plan.vercel.app/api/get-total`, {
      headers: { Authorization: `Bearer` },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    // Parse and log the JSON data
    const data = await response.json();
    console.log("Data fetched from API:", data);
  } catch (error) {
    console.error("Error in script execution:", error);
    process.exit(1);
  }
}
// Call the main function
main();
