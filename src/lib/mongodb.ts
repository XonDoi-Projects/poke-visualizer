import { MongoClient } from "mongodb";

if (!process.env.NEXT_PUBLIC_MONGO_URI) {
  throw new Error('Invalid environment variable: "NEXT_PUBLIC_MONGO_URI"');
}

const uri = process.env.NEXT_PUBLIC_MONGO_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.NEXT_PUBLIC_MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
