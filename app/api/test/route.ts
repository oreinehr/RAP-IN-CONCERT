import clientPromise from "@/lib.mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rapinconcert");
    const artistas = await db.collection("artistas").find({}).toArray();
    return NextResponse.json(artistas);
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}
