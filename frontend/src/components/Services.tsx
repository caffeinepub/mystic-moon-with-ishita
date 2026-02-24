import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetTarotServiceCatalog } from '@/hooks/useQueries';

// Hand-pentacle SVG illustration matching the uploaded service images
function HandPentacleSVG({ flip = false, size = 120 }: { flip?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      {/* Cloud swirls */}
      <path d="M10 80 Q15 70 20 80 Q25 70 30 80 Q35 70 40 80" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M5 90 Q12 78 18 90 Q25 78 32 90" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M8 100 Q16 88 24 100 Q32 88 40 100" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Hand */}
      <path d="M45 110 Q50 95 55 85 Q58 78 60 70 L62 60 Q63 55 65 58 L66 70 Q68 60 70 62 L71 72 Q73 63 75 65 L76 74 Q78 66 80 68 L80 80 Q82 72 84 74 L84 90 Q82 100 78 108 Q72 115 65 115 Q55 115 48 112 Z" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Circle */}
      <circle cx="75" cy="35" r="22" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" />
      {/* Pentacle star */}
      <path d="M75 15 L79 27 L92 27 L82 35 L86 47 L75 39 L64 47 L68 35 L58 27 L71 27 Z" stroke="oklch(52% 0.12 230)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

interface ServiceItem {
  name: string;
  price: bigint;
  description: string;
  isVoiceNote: boolean;
  isUrgent: boolean;
}

interface ServiceCategoryCardProps {
  emoji: string;
  title: string;
  services: ServiceItem[];
  accentColor: string;
  staticServices?: { name: string; price: string; note?: string }[];
}

function ServiceCategoryCard({ emoji, title, accentColor, staticServices }: ServiceCategoryCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-crystal transition-all duration-300 hover:shadow-crystal-lg"
      style={{ background: 'oklch(99% 0.005 80)', border: '1px solid oklch(72% 0.1 230 / 0.2)' }}>
      {/* Top hand illustration */}
      <div className="flex justify-start px-4 pt-4 pb-0">
        <HandPentacleSVG size={100} />
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <h3 className="font-display text-xl font-bold mb-4 text-center"
          style={{ color: accentColor }}>
          {emoji} {title}
        </h3>

        <ul className="space-y-2">
          {staticServices?.map((svc, i) => (
            <li key={i} className="font-body text-base text-center leading-snug"
              style={{ color: 'oklch(25% 0.05 240)' }}>
              <span className="font-semibold">• {svc.name}</span>
              {svc.price && <span style={{ color: accentColor }}> – {svc.price}</span>}
              {svc.note && (
                <span className="block text-sm mt-0.5" style={{ color: 'oklch(52% 0.06 240)' }}>
                  ({svc.note})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom hand illustration (flipped) */}
      <div className="flex justify-end px-4 pb-4 pt-0">
        <HandPentacleSVG size={100} flip />
      </div>
    </div>
  );
}

const STATIC_SERVICES = {
  miniReading: [
    { name: '1 Question Reading', price: '₹199', note: 'Yes/No or short guidance' },
    { name: '3 Card Reading', price: '₹299', note: 'Past–Present–Future / Situation–Advice–Outcome' },
  ],
  loveRelationship: [
    { name: 'Love Guidance Reading', price: '₹399' },
    { name: 'No Contact / Separation Reading', price: '₹499' },
    { name: 'Does He/She Love Me?', price: '₹499' },
    { name: 'Future of This Connection', price: '₹599' },
  ],
  careerMoneyLife: [
    { name: 'Career Guidance Reading', price: '₹399' },
    { name: 'Money & Abundance Reading', price: '₹499' },
    { name: 'Life Purpose / Direction Reading', price: '₹699' },
  ],
  deepDetailed: [
    { name: 'Full Tarot Spread (6–8 cards)', price: '₹999' },
    { name: '1 Month Forecast', price: '₹899' },
    { name: '3 Month Forecast', price: '₹1,499' },
  ],
  premiumExclusive: [
    { name: 'Soulmate / Twin Flame Reading', price: '₹1,499' },
    { name: 'Personalized Voice Note Reading', price: '₹1,999' },
    { name: 'Emergency Same-Day Reading', price: '+₹300 extra' },
  ],
};

export default function Services() {
  const { data: catalog } = useGetTarotServiceCatalog();

  const categories = [
    {
      key: 'miniReading' as const,
      emoji: '🌟',
      title: 'Mini Readings',
      accentColor: 'oklch(52% 0.12 230)',
    },
    {
      key: 'loveRelationship' as const,
      emoji: '💖',
      title: 'Love & Relationship Readings',
      accentColor: 'oklch(58% 0.14 10)',
    },
    {
      key: 'careerMoneyLife' as const,
      emoji: '💼',
      title: 'Career / Money / Life',
      accentColor: 'oklch(55% 0.12 60)',
    },
    {
      key: 'deepDetailed' as const,
      emoji: '🌙',
      title: 'Deep & Detailed Readings',
      accentColor: 'oklch(45% 0.1 270)',
    },
    {
      key: 'premiumExclusive' as const,
      emoji: '🔥',
      title: 'Premium / Exclusive',
      accentColor: 'oklch(52% 0.15 35)',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, oklch(94% 0.02 220) 0%, oklch(97% 0.008 80) 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
            <span className="font-body text-sm tracking-widest uppercase" style={{ color: 'oklch(52% 0.12 230)' }}>
              ✦ Services ✦
            </span>
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'oklch(52% 0.12 230)' }}>
            Tarot Reading Services
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: 'oklch(45% 0.06 240)' }}>
            Choose the reading that resonates with your soul's journey
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => (
            <ServiceCategoryCard
              key={cat.key}
              emoji={cat.emoji}
              title={cat.title}
              accentColor={cat.accentColor}
              services={catalog ? (catalog as Record<string, ServiceItem[]>)[cat.key] ?? [] : []}
              staticServices={STATIC_SERVICES[cat.key]}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/mysticmoonwithishita"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="font-display text-sm tracking-wider px-10 py-6 rounded-full shadow-crystal hover:shadow-crystal-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'oklch(52% 0.12 230)',
                color: 'oklch(99% 0.005 80)',
                border: 'none',
              }}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Book Your Reading on Instagram
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
