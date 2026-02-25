import React from 'react';
import { Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { ProductType } from '../backend';
import { formatPrice, calculateHoliPrice, HOLI_PROMO_ACTIVE } from '../utils/pricing';

const CRYSTAL_INTENTIONS: Record<string, string> = {
  'amethyst-cluster': 'Open your third eye and deepen your spiritual connection today.',
  'rose-quartz-tumbled': 'Invite unconditional love and compassion into your heart today.',
  'clear-quartz-point': 'Amplify your intentions and manifest your highest vision today.',
  'black-tourmaline': 'Ground yourself and shield your energy from negativity today.',
  'green-aventurine': 'Attract luck, abundance, and new opportunities into your life today.',
  'labradorite': 'Embrace transformation and awaken your inner magic today.',
  'selenite-wand': 'Cleanse your energy field and connect to higher realms today.',
  'lapis-lazuli': 'Speak your truth with wisdom and clarity today.',
  'citrine-cluster': 'Radiate joy, abundance, and the energy of manifestation today.',
  'clear-quartz-raw': 'Amplify all your intentions and heal on every level today.',
  'amethyst-raw': 'Deepen your meditation and strengthen your spiritual protection today.',
  'rose-quartz-raw': 'Nurture self-love and open your heart to receive love today.',
  'black-tourmaline-raw': 'Create a powerful shield and stay grounded in your truth today.',
  'green-aventurine-raw': 'Step into the flow of luck and prosperity today.',
  'labradorite-raw': 'Awaken your mystical gifts and navigate change with grace today.',
  'selenite-raw': 'Purify your space and elevate your vibration to the highest frequency today.',
  'fluorite-raw': 'Sharpen your focus and clear mental fog for crystal clarity today.',
  'moldavite-raw': 'Accelerate your spiritual evolution and embrace rapid transformation today.',
};

function getDefaultIntention(name: string): string {
  return `Work with ${name} today to align with your highest purpose and spiritual path.`;
}

export default function CrystalOfTheDay() {
  const crystals = products.filter(
    (p) => p.productType === ProductType.crystal && p.subType !== 'yantra'
  );

  // Deterministic daily selection based on date
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % crystals.length;
  const crystal = crystals[index];

  if (!crystal) return null;

  const intention = CRYSTAL_INTENTIONS[crystal.id] || getDefaultIntention(crystal.name);
  const price = HOLI_PROMO_ACTIVE ? calculateHoliPrice(crystal.price) : crystal.price;

  const handleShopNow = () => {
    const el = document.getElementById(`product-${crystal.id}`);
    if (el) {
      const headerOffset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      // Fallback: scroll to shop section
      const shopEl = document.getElementById('shop');
      if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-14 px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, oklch(94% 0.018 220 / 0.6) 0%, oklch(97% 0.008 80) 50%, oklch(94% 0.018 220 / 0.6) 100%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles size={16} style={{ color: 'oklch(72% 0.18 55)' }} />
            <p className="text-primary font-medium tracking-widest uppercase text-sm">
              Daily Crystal Guidance
            </p>
            <Sparkles size={16} style={{ color: 'oklch(72% 0.18 55)' }} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Crystal of the Day
          </h2>
        </div>

        {/* Card */}
        <div
          className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: 'oklch(99% 0.005 80)',
            boxShadow: '0 8px 40px oklch(52% 0.12 230 / 0.15)',
            border: '1px solid oklch(72% 0.1 230 / 0.2)',
          }}
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="sm:w-56 flex-shrink-0 relative">
              <div
                className="w-full h-56 sm:h-full"
                style={{
                  background: 'linear-gradient(135deg, oklch(93% 0.02 220), oklch(97% 0.008 80))',
                }}
              >
                <img
                  src={crystal.imageUrl}
                  alt={crystal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              {/* Date badge */}
              <div
                className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white font-display"
                style={{
                  background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(45% 0.14 260))',
                }}
              >
                {today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} style={{ color: 'oklch(72% 0.18 55)' }} />
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-display">
                  Today's Crystal
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                {crystal.name}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 italic">
                "{intention}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold font-display" style={{ color: 'oklch(52% 0.12 230)' }}>
                    {formatPrice(price)}
                  </span>
                  {HOLI_PROMO_ACTIVE && (
                    <span className="text-xs text-muted-foreground ml-2 line-through">
                      {formatPrice(crystal.price)}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleShopNow}
                  className="px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg font-display"
                  style={{
                    background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(45% 0.14 260))',
                    boxShadow: '0 4px 16px oklch(52% 0.12 230 / 0.3)',
                  }}
                >
                  Shop Now ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
