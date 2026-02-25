import React, { useState, useEffect } from 'react';
import { HOLI_DISCOUNT_PERCENTAGE, HOLI_PROMO_ACTIVE } from '../utils/pricing';

// Holi sale end date — update this to control when the countdown expires
const HOLI_SALE_END_DATE = new Date('2026-03-15T23:59:59');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diff = HOLI_SALE_END_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function HoliBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft);

  useEffect(() => {
    if (!HOLI_PROMO_ACTIVE) return;
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!HOLI_PROMO_ACTIVE) return null;

  return (
    <div
      className="w-full py-2 px-4 text-center relative overflow-hidden"
      style={{
        background:
          'linear-gradient(90deg, oklch(62% 0.24 15), oklch(68% 0.22 40), oklch(72% 0.20 80), oklch(65% 0.22 300), oklch(62% 0.24 15))',
        backgroundSize: '300% 100%',
        animation: 'holi-slide 6s linear infinite',
      }}
    >
      {/* Decorative dots */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-lg select-none pointer-events-none hidden sm:block">
        🌸
      </span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-lg select-none pointer-events-none hidden sm:block">
        🌸
      </span>

      {/* Main promo text */}
      <p className="text-white font-semibold text-sm md:text-base tracking-wide drop-shadow-sm">
        🎨 <span className="font-bold">Holi Special Sale</span> — Flat{' '}
        <span
          className="inline-block px-2 py-0.5 rounded-full text-xs md:text-sm font-extrabold mx-1"
          style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)' }}
        >
          {HOLI_DISCOUNT_PERCENTAGE}% OFF
        </span>{' '}
        on Everything! 🎉
      </p>

      {/* Countdown timer */}
      <div className="mt-1 flex items-center justify-center gap-1.5">
        {timeLeft ? (
          <>
            <span className="text-white/80 text-xs font-medium tracking-wide">Ends in:</span>
            {[
              { value: timeLeft.days, label: 'd' },
              { value: timeLeft.hours, label: 'h' },
              { value: timeLeft.minutes, label: 'm' },
              { value: timeLeft.seconds, label: 's' },
            ].map(({ value, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <span className="text-white/70 font-bold text-xs leading-none">:</span>
                )}
                <span
                  className="inline-flex items-baseline gap-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '4px',
                    padding: '1px 5px',
                  }}
                >
                  <span className="text-white font-extrabold text-xs tabular-nums">
                    {pad(value)}
                  </span>
                  <span className="text-white/75 text-[10px] font-semibold">{label}</span>
                </span>
              </React.Fragment>
            ))}
          </>
        ) : (
          <span
            className="text-white font-bold text-xs px-3 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}
          >
            🎊 Offer Ended
          </span>
        )}
      </div>

      <style>{`
        @keyframes holi-slide {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
