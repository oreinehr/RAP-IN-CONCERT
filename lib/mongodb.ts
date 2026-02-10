import { MongoClient, Db } from "mongodb";

declare global {
  var mongoClientPromise: Promise<MongoClient>;
}

let db: Db;

if (!process.env.MONGODB_URI) {
  throw new Error("Defina a variável MONGODB_URI");
}

if (!global.mongoClientPromise) {
  const client = new MongoClient(process.env.MONGODB_URI);
  global.mongoClientPromise = client.connect();
}

export async function getDb() {
  if (!db) {
    const client = await global.mongoClientPromise;
    db = client.db("rapdb"); // seu database
  }
  return db;
}
