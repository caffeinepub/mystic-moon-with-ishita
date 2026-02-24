import { useCallback } from 'react';

export default function Header() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full"
      style={{ background: 'oklch(99% 0.005 80 / 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid oklch(72% 0.1 230 / 0.2)' }}>
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center">
        <button
          onClick={scrollToTop}
          className="flex items-center group focus:outline-none"
          aria-label="Scroll to top"
        >
          {/* Logo image - full logo with text */}
          <div className="relative">
            <img
              src="/assets/generated/mystic-moon-logo.dim_800x600.png"
              alt="Mystic Moon with Ishita Logo"
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback SVG logo */}
            <div className="hidden items-center gap-2" style={{ display: 'none' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Crescent moon */}
                <path d="M24 6C14.06 6 6 14.06 6 24C6 33.94 14.06 42 24 42C28.5 42 32.6 40.3 35.7 37.5C33.2 38.3 30.5 38.5 27.8 37.8C19.5 35.6 14.2 27.4 15.8 19C17.1 12.2 22.8 7.2 29.7 6.3C27.9 6.1 26 6 24 6Z" fill="oklch(52% 0.12 230)" />
                {/* Crystal cluster */}
                <path d="M28 14L30 22L26 22L28 14Z" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" />
                <path d="M32 16L35 23L29 23L32 16Z" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" />
                <path d="M24 16L27 24L21 24L24 16Z" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" />
                {/* Sparkles */}
                <circle cx="36" cy="14" r="1.5" fill="oklch(78% 0.08 30)" />
                <circle cx="38" cy="20" r="1" fill="oklch(78% 0.08 30)" />
                <circle cx="34" cy="10" r="1" fill="oklch(78% 0.08 30)" />
              </svg>
              <div className="text-left">
                <h1 className="font-display text-lg md:text-xl font-bold leading-tight"
                  style={{ color: 'oklch(52% 0.12 230)' }}>
                  MYSTIC MOON
                </h1>
                <p className="font-display text-xs md:text-sm font-medium tracking-widest"
                  style={{ color: 'oklch(52% 0.12 230 / 0.75)' }}>
                  WITH ISHITA
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
