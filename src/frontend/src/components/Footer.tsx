import { SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'mysticmoonwithishita';

  return (
    <footer className="bg-gradient-to-b from-mystic-purple/10 to-mystic-purple/20 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-mystic-purple dark:text-mystic-rose mb-4 font-serif">
              Mystic Moon with Ishita
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your trusted guide for spiritual wisdom, authentic tarot readings, and healing crystals.
            </p>
            <a
              href="https://instagram.com/MysticMoonWithIshita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mystic-purple dark:text-mystic-rose hover:text-mystic-rose dark:hover:text-mystic-gold transition-colors"
            >
              <SiInstagram className="w-5 h-5" />
              @MysticMoonWithIshita
            </a>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-mystic-purple dark:text-mystic-rose mb-4 font-serif">
              Our Services
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Tarot Card Readings</li>
              <li>Crystal Healing</li>
              <li>Spiritual Guidance</li>
              <li>Energy Cleansing</li>
              <li>Chakra Balancing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-mystic-purple dark:text-mystic-rose mb-4 font-serif">
              Shop
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Healing Crystals</li>
              <li>Crystal Bracelets</li>
              <li>Divination Pendulums</li>
              <li>Spiritual Tools</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-mystic-purple/20 dark:border-mystic-rose/20 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            © {currentYear} MysticMoonWithIshita.com - All rights reserved
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            Built with <Heart className="w-4 h-4 text-mystic-rose inline" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mystic-purple dark:text-mystic-rose hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
