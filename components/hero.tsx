export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden pt-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          backgroundImage: "url(/1.png)",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center">
          
       

          {/* Botão */}
        
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)] pointer-events-none" />
    </div>
  );
}
