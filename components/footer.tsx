import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      {/* Container alinhado com o site */}
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Texto */}
        <h1 className="text-2xl md:text-6xl font-extrabold tracking-tight">
          O RAP VIVE!
        </h1>

        {/* Botão */}
        <Link
          href="https://wa.me/5551994513729"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg border border-white/25 text-white font-normal hover:border-white/60 hover:bg-white/5 transition-colors"
        >
          Entre em Contato
        </Link>
      </div>

      {/* Linha de separação opcional */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Rap in Concert. Todos os direitos reservados.
      </div>
    </footer>
  );
}
