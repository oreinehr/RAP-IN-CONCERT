import { MongoClient, Db } from "mongodb";

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

let db: Db | undefined;

export async function getDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI não definida");
  }

  if (!global.mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    global.mongoClientPromise = client.connect();
  }

  if (!db) {
    const client = await global.mongoClientPromise;
    db = client.db("rapinconcert"); // mesmo nome da URI
  }

  return db;
}
