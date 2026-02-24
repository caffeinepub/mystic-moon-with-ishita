import { Instagram, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'mysticmoonwithishita');

  return (
    <footer style={{ background: 'oklch(22% 0.06 240)', color: 'oklch(88% 0.02 230)' }}>
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/mystic-moon-logo.dim_400x300.png"
                alt="Mystic Moon with Ishita"
                className="h-14 w-auto object-contain brightness-0 invert opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'oklch(72% 0.1 230)' }}>
              Mystic Moon with Ishita
            </h3>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'oklch(72% 0.04 240)' }}>
              Authentic tarot readings, crystal healing, and spiritual guidance — delivered with love and intuition.
            </p>
            <a
              href="https://www.instagram.com/mysticmoonwithishita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm transition-colors duration-200 hover:opacity-80"
              style={{ color: 'oklch(72% 0.1 230)' }}
            >
              <Instagram className="w-4 h-4" />
              @mysticmoonwithishita
            </a>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider uppercase mb-4"
              style={{ color: 'oklch(72% 0.1 230)' }}>
              Reading Services
            </h4>
            <ul className="space-y-2">
              {[
                '🌟 Mini Readings',
                '💖 Love & Relationship',
                '💼 Career / Money / Life',
                '🌙 Deep & Detailed',
                '🔥 Premium / Exclusive',
              ].map((service) => (
                <li key={service}>
                  <span className="font-body text-sm" style={{ color: 'oklch(72% 0.04 240)' }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop column */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider uppercase mb-4"
              style={{ color: 'oklch(72% 0.1 230)' }}>
              Crystal Shop
            </h4>
            <ul className="space-y-2 mb-6">
              {[
                '💎 Crystals & Clusters',
                '📿 Healing Bracelets',
                '🔮 Pendulums',
              ].map((item) => (
                <li key={item}>
                  <span className="font-body text-sm" style={{ color: 'oklch(72% 0.04 240)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="https://www.instagram.com/mysticmoonwithishita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: 'oklch(52% 0.12 230)',
                color: 'oklch(99% 0.005 80)',
              }}
            >
              <Instagram className="w-4 h-4" />
              Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid oklch(35% 0.06 240)' }}>
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-sm text-center sm:text-left" style={{ color: 'oklch(60% 0.04 240)' }}>
            © {currentYear} MysticMoonWithIshita.com · All rights reserved
          </p>
          <p className="font-body text-sm flex items-center gap-1" style={{ color: 'oklch(60% 0.04 240)' }}>
            Built with <Heart className="w-3.5 h-3.5 fill-current" style={{ color: 'oklch(72% 0.1 230)' }} /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ color: 'oklch(72% 0.1 230)' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
