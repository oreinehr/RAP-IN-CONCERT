import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await getDb();
  const body = await req.json();

  await db.collection("artistas").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: body }
  );

  return NextResponse.json({ success: true });
}
