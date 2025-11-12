export default function YoutubeSection() {
  return (
    <section id="video" className="w-full py-16 px-4 md:px-8">
      <div className="w-full max-w-9xl mx-auto">
        <div
          className="relative w-full bg-black overflow-hidden"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/Sz2M7kgaHF0?rel=0&controls=0&showinfo=0&modestbranding=1&autohide=1"
            title="Rap in Concert"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
