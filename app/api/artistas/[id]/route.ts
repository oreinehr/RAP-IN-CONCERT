import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await getDb();
  const data = await req.formData();

  const nome = data.get("nome")?.toString();
  const descricao = data.get("descricao")?.toString();
  const imagem = data.get("imagem") as File | null;

  if (!nome || !descricao) return NextResponse.json({ error: "Nome e descrição obrigatórios" }, { status: 400 });

  let updateData: any = { nome, descricao };
  if (imagem && imagem.size > 0) {
    const buffer = Buffer.from(await imagem.arrayBuffer());
    const fs = require("fs");
    const path = `public/uploads/${Date.now()}-${imagem.name}`;
    fs.writeFileSync(path, buffer);
    updateData.imageUrl = "/" + path.replace("public/", "");
  }

  const slug = nome.toLowerCase().replace(/\s+/g, "-");
  updateData.slug = slug;

  const result = await db.collection("artistas").findOneAndUpdate(
    { _id: new ObjectId(params.id) },
    { $set: updateData },
    { returnDocument: "after" }
  );

  return NextResponse.json(result.value);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await getDb();
  await db.collection("artistas").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ ok: true });
}
