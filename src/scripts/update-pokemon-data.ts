if (!process.env.NEXT_POKEMON_API_URL) {
  throw new Error('Invalid environment variable: "NEXT_POKEMON_API_URL"');
}

const url = process.env.NEXT_POKEMON_API_URL;

console.log(url);

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
