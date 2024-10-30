if (!process.env.POKEMON_API_URL) {
  throw new Error('Invalid environment variable: "POKEMON_API_URL"');
}

const url = process.env.POKEMON_API_URL;

async function fetchData() {
  try {
    const response = await fetch(url, {
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