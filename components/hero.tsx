export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden pt-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url(/1.png)",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center">
         <h1
  className="text-9xl sm:text-9xl font-black text-white drop-shadow-lg tracking-wider mix-blend-lighten opacity-50"
>
  RAP IN CONCERT
</h1>
          <p className="mt-2 text-xl text-gray-300">O primeiro Espetáculo de Rap do Rio Grande do Sul</p>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)]" />
    </div>
  )
}
