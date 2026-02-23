export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-mystic-purple/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mystic-purple/50 rounded-lg"
            aria-label="Mystic Moon with Ishita - Return to top"
          >
            <img
              src="/assets/mystic-moon-logo.dim_800x600.png"
              alt="Mystic Moon with Ishita"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
