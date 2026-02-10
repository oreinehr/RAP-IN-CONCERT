import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

if (!globalThis.mongoClientPromise) {
  client = new MongoClient(process.env.MONGODB_URI!);
  globalThis.mongoClientPromise = client.connect();
}

export async function getDb() {
  if (!db) {
    const client = await globalThis.mongoClientPromise;
    db = client.db("rapdb"); // nome do seu database
  }
  return db;
}
