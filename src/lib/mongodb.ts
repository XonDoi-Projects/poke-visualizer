import { MongoClient } from "mongodb";

if (!process.env.NEXT_PUBLIC_MONGO_URI) {
  throw new Error('Invalid environment variable: "NEXT_PUBLIC_MONGO_URI"');
}

const uri = process.env.NEXT_PUBLIC_MONGO_URI;
const options = {};

console.log(uri);

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.NEXT_PUBLIC_MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

async function setupIndexes() {
  const client = await clientPromise;
  const db = client.db("pokemons");
  const pokemons = db.collection("pokemons");
  const varieties = db.collection("varieties");

  await pokemons.createIndex({ index: 1 }, { unique: true });
  await varieties.createIndex({ index: 1 }, { unique: true });
}

setupIndexes().catch(console.error);

export default clientPromise;
