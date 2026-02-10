import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { error: "ID inválido" },
      { status: 400 }
    );
  }

  const db = await getDb();
  const collection = db.collection("artistas");

  const data = await req.formData();

  const nome = data.get("nome")?.toString();
  const descricao = data.get("descricao")?.toString();
  const imagem = data.get("imagem") as File | null;

  if (!nome || !descricao) {
    return NextResponse.json(
      { error: "Nome e descrição obrigatórios" },
      { status: 400 }
    );
  }

  const updateData: any = {
    nome,
    descricao,
    slug: nome.toLowerCase().replace(/\s+/g, "-"),
  };

  if (imagem && imagem.size > 0) {
    const buffer = Buffer.from(await imagem.arrayBuffer());
    const fileName = `${Date.now()}-${imagem.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    fs.writeFileSync(filePath, buffer);
    updateData.imageUrl = `/uploads/${fileName}`;
  }

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(params.id) },
    { $set: updateData },
    { returnDocument: "after" }
  );

  if (!result.value) {
    return NextResponse.json(
      { error: "Artista não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(result.value);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { error: "ID inválido" },
      { status: 400 }
    );
  }

  const db = await getDb();
  await db.collection("artistas").deleteOne({
    _id: new ObjectId(params.id),
  });

  return NextResponse.json({ ok: true });
}
