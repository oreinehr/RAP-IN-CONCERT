import Image from "next/image";

export default function IntroSection() {
  return (
    <section id="about" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        {/* Conteúdo de texto */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-7xl font-black text-foreground mb-2 text-balance">
            é ritmo, mas também é poesia...
          </h1>
          <p className="text-lg font-semibold text-white text-muted-foreground leading-relaxed max-w-3xl mb-5">
            O Rap in Concert é um espetáculo cultural inovador que celebra a cultura hip‑hop e o rap com uma proposta única: unir ritmo, poesia e performance ao vivo em um formato artístico impactante. Idealizado para levar a energia das ruas às estruturas tradicionais de palco, o projeto transforma versos e batidas em uma experiência sonora e visual envolvente, mostrando o rap como expressão artística e forma de conexão social.
          </p>
          <p className="text-sm text-white leading-relaxed max-w-3xl">
            Ao longo dos anos, o espetáculo já teve várias edições em Campo Bom. A 1ª edição foi realizada como um evento pioneiro de rap com formato de concerto, atraindo público interessado em uma experiência nova e autêntica de hip‑hop na cidade. A 2ª edição continuou a fortalecer essa proposta, reunindo ainda mais artistas e público, consolidando o evento como referência cultural local. Mais recentemente, a 3ª edição – intitulada NADA PODE NOS PARAR! – aconteceu em dezembro de 2025 no Teatro Municipal Marlise Saueressig (CEI), com duas sessões marcadas e um elenco diverso de artistas da cena rap e hip‑hop.
          </p>
        </div>

        {/* Imagem quadrada */}
        <div className="w-100 h-100 relative flex-shrink-0">
          <Image
            src="/Rectangle 7.png" // substitua pelo caminho da sua imagem
            alt="Rap in Concert"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
