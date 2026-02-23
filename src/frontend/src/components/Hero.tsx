import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mystic-purple/20 via-mystic-rose/10 to-transparent dark:from-mystic-purple/30 dark:via-mystic-rose/20" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mystic-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mystic-rose/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6 inline-block">
          <div className="relative">
            <div className="w-32 h-32 mx-auto rounded-full shadow-2xl shadow-mystic-purple/30 border-4 border-mystic-gold/30 bg-gradient-to-br from-mystic-purple/20 to-mystic-rose/20 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-mystic-gold" />
            </div>
            <div className="absolute -top-2 -right-2 animate-spin-slow">
              <Sparkles className="w-8 h-8 text-mystic-gold" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-serif">
          <span className="bg-gradient-to-r from-mystic-purple via-mystic-rose to-mystic-gold bg-clip-text text-transparent">
            Mystic Moon with Ishita
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 mb-4 font-light">
          Your Gateway to Spiritual Wisdom & Healing
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Authentic Tarot Readings • Healing Crystals • Spiritual Guidance
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#services"
            className="px-8 py-3 bg-gradient-to-r from-mystic-purple to-mystic-rose text-white rounded-full hover:shadow-lg hover:shadow-mystic-purple/30 transition-all duration-300 font-semibold"
          >
            Explore Services
          </a>
          <a
            href="#products"
            className="px-8 py-3 bg-white dark:bg-gray-800 text-mystic-purple dark:text-mystic-rose border-2 border-mystic-purple/30 dark:border-mystic-rose/30 rounded-full hover:shadow-lg hover:border-mystic-purple dark:hover:border-mystic-rose transition-all duration-300 font-semibold"
          >
            Shop Crystals
          </a>
        </div>
      </div>
    </header>
  );
}
