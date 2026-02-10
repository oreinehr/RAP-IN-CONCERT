"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

// Header do site
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm  border-b border-gray-800">
      <div className="max-w-8xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <a href="/" className="flex items-center">
          <Image src="/RIC.svg" width={150} height={40} alt="Rap in Concert" className="object-contain" />
        </a>
        <nav className="hidden md:flex space-x-8">
          <a href="#artistas" className="text-gray-300 hover:text-white font-semibold transition-colors">Artistas</a>
          <a href="#novo" className="text-gray-300 hover:text-white font-semibold transition-colors">Novo Artista</a>
        </nav>
      </div>
    </header>
  );
}

interface Artista {
  _id: string;
  nome: string;
  descricao: string;
  slug: string;
  imageUrl: string;
}

export default function AdminPanel() {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [editArtist, setEditArtist] = useState<Artista | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/artistas")
      .then((res) => res.json())
      .then(setArtistas);
  }, []);

  // Criar novo artista
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    if (imagem) formData.append("imagem", imagem);

    const res = await fetch("/api/artistas", { method: "POST", body: formData });
    const data = await res.json();
    if (!data.error) {
      alert("Artista criado com sucesso!");
      setArtistas([...artistas, data]);
      setNome("");
      setDescricao("");
      setImagem(null);
    }
  };

  // Abrir modal de edição
  const handleEdit = (artist: Artista) => {
    setEditArtist(artist);
    setNome(artist.nome);
    setDescricao(artist.descricao);
    setModalOpen(true);
  };

  // Atualizar artista
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editArtist) return;

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    if (imagem) formData.append("imagem", imagem);

    const res = await fetch(`/api/artistas/${editArtist._id}`, { method: "PUT", body: formData });
    const data = await res.json();
    if (!data.error) {
      alert("Artista atualizado!");
      setArtistas(artistas.map(a => (a._id === editArtist._id ? data : a)));
      setModalOpen(false);
      setEditArtist(null);
      setNome("");
      setDescricao("");
      setImagem(null);
    }
  };

  // Deletar artista
  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente deletar este artista?")) return;

    const res = await fetch(`/api/artistas/${id}`, { method: "DELETE" });
    if (res.ok) {
      setArtistas(artistas.filter(a => a._id !== id));
      alert("Artista removido com sucesso!");
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen pt-20 pb-16 px-4 md:px-8 text-white">
      <Header />

      {/* Criar novo artista */}
      <section id="novo" className="max-w-4xl mx-auto mb-12 bg-gray-800 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Criar Novo Artista</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Nome do artista</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-3 rounded bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Digite o nome"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="p-3 rounded bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Descrição breve"
              rows={4}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Imagem</label>
            <input type="file" onChange={(e) => setImagem(e.target.files?.[0] || null)} className="text-gray-200" />
          </div>
          <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-white hover:text-black transition-colors">
            Criar Artista
          </button>
        </form>
      </section>

      {/* Lista de artistas */}
      <section id="artistas" className="max-w-8xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Artistas Cadastrados</h2>
        {artistas.length === 0 && <p className="text-gray-400">Nenhum artista cadastrado.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistas.map((a) => (
            <div key={a._id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
              {a.imageUrl && <img src={a.imageUrl} className="w-full h-56 object-cover" />}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{a.nome}</h3>
                <p className="text-gray-300 text-sm">{a.descricao}</p>
                <p className="text-gray-500 text-xs mt-2">Slug: {a.slug}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 transition-colors"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de edição */}
      {modalOpen && editArtist && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => { setModalOpen(false); setEditArtist(null); }}
        >
          <div
            className="bg-gray-800 rounded-xl shadow-2xl max-w-xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">Editar Artista</h3>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nome"
                required
              />
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Descrição"
                required
              />
              <input type="file" onChange={(e) => setImagem(e.target.files?.[0] || null)} />
              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500" onClick={() => { setModalOpen(false); setEditArtist(null); }}>
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-primary rounded hover:bg-white hover:text-black transition-colors">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
