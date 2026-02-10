import { MongoClient, Db } from "mongodb";

declare global {
  // evita múltiplas conexões no dev
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let db: Db;

const uri = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    if (!uri) {
      throw new Error("MONGODB_URI não definida");
    }
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  if (!uri) {
    throw new Error("MONGODB_URI não definida");
  }
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  if (!db) {
    const client = await clientPromise;
    db = client.db("rapdb");
  }
  return db;
}
