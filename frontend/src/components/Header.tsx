import { useCallback } from 'react';
import { Heart, Star } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import HoliBanner from './HoliBanner';
import LoyaltyPointsBadge from './LoyaltyPointsBadge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HeaderProps {
  onOpenWishlist?: () => void;
}

export default function Header({ onOpenWishlist }: HeaderProps) {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { wishlistCount } = useWishlist();

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'oklch(99% 0.005 80 / 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid oklch(72% 0.1 230 / 0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Spacer left */}
          <div className="w-10 hidden sm:block" />

          {/* Logo centered */}
          <button
            onClick={scrollToTop}
            className="flex items-center group focus:outline-none"
            aria-label="Scroll to top"
          >
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
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 6C14.06 6 6 14.06 6 24C6 33.94 14.06 42 24 42C28.5 42 32.6 40.3 35.7 37.5C33.2 38.3 30.5 38.5 27.8 37.8C19.5 35.6 14.2 27.4 15.8 19C17.1 12.2 22.8 7.2 29.7 6.3C27.9 6.1 26 6 24 6Z"
                    fill="oklch(52% 0.12 230)"
                  />
                  <path
                    d="M28 14L30 22L26 22L28 14Z"
                    stroke="oklch(52% 0.12 230)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M32 16L35 23L29 23L32 16Z"
                    stroke="oklch(52% 0.12 230)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M24 16L27 24L21 24L24 16Z"
                    stroke="oklch(52% 0.12 230)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="36" cy="14" r="1.5" fill="oklch(78% 0.08 30)" />
                  <circle cx="38" cy="20" r="1" fill="oklch(78% 0.08 30)" />
                  <circle cx="34" cy="10" r="1" fill="oklch(78% 0.08 30)" />
                </svg>
                <div className="text-left">
                  <h1
                    className="font-display text-lg md:text-xl font-bold leading-tight"
                    style={{ color: 'oklch(52% 0.12 230)' }}
                  >
                    MYSTIC MOON
                  </h1>
                  <p
                    className="font-display text-xs md:text-sm font-medium tracking-widest"
                    style={{ color: 'oklch(52% 0.12 230 / 0.75)' }}
                  >
                    WITH ISHITA
                  </p>
                </div>
              </div>
            </div>
          </button>

          {/* Right side: Rating + Loyalty badge + Wishlist */}
          <div className="flex items-center gap-2">
            {/* Website Rating Badge */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-full cursor-default select-none"
                    style={{
                      background: 'linear-gradient(135deg, oklch(96% 0.04 80), oklch(98% 0.02 60))',
                      border: '1px solid oklch(82% 0.12 80 / 0.5)',
                    }}
                    aria-label="Website rating: 100 out of 100 stars"
                  >
                    <Star
                      size={13}
                      className="shrink-0"
                      style={{ fill: 'oklch(78% 0.18 75)', color: 'oklch(78% 0.18 75)' }}
                    />
                    <span
                      className="text-[11px] font-bold leading-none hidden sm:inline"
                      style={{ color: 'oklch(45% 0.1 75)' }}
                    >
                      100
                    </span>
                    <span
                      className="text-[10px] leading-none hidden sm:inline"
                      style={{ color: 'oklch(55% 0.08 75)' }}
                    >
                      /100
                    </span>
                    {/* Mobile: just star + 100 compact */}
                    <span
                      className="text-[11px] font-bold leading-none sm:hidden"
                      style={{ color: 'oklch(45% 0.1 75)' }}
                    >
                      100★
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  <p className="font-semibold">⭐ Website Rating: 100 / 100</p>
                  <p className="text-muted-foreground">Loved by our customers!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <LoyaltyPointsBadge />

            {/* Wishlist button */}
            <button
              onClick={onOpenWishlist}
              aria-label={`Open wishlist (${wishlistCount} items)`}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors group"
            >
              <Heart
                size={20}
                className={
                  wishlistCount > 0
                    ? 'fill-red-500 text-red-500'
                    : 'text-muted-foreground group-hover:text-primary'
                }
              />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1"
                  style={{
                    background: 'linear-gradient(135deg, oklch(65% 0.22 15), oklch(72% 0.18 55))',
                  }}
                >
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Holi Banner — directly below the logo, inside sticky header */}
        <HoliBanner />
      </header>
    </>
  );
}
