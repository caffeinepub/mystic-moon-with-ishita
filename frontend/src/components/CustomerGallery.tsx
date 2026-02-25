import React, { useState } from 'react';
import { Heart, Instagram } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

const galleryImages = [
  {
    src: '/assets/generated/unboxing-1.dim_600x600.png',
    alt: 'Customer unboxing crystal gift set with rose quartz and amethyst',
  },
  {
    src: '/assets/generated/unboxing-2.dim_600x600.png',
    alt: 'Happy customer receiving moonstone bracelet and crystal collection',
  },
  {
    src: '/assets/generated/unboxing-3.dim_600x600.png',
    alt: 'Beautiful crystal unboxing with labradorite and selenite wand',
  },
  {
    src: '/assets/generated/unboxing-4.dim_600x600.png',
    alt: 'Customer unboxing chakra bracelet set with healing crystals',
  },
  {
    src: '/assets/generated/unboxing-5.dim_600x600.png',
    alt: 'Citrine cluster and green aventurine unboxing by happy customer',
  },
  {
    src: '/assets/generated/unboxing-6.dim_600x600.png',
    alt: 'Customer unboxing yantra and crystal healing kit',
  },
];

export default function CustomerGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4" style={{ background: 'oklch(96% 0.012 220)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            ✦ Community Love ✦
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Our Happy Customers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body text-base leading-relaxed">
            Real moments of joy from our crystal family. Every unboxing is a new beginning. 💫
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
              style={{ boxShadow: '0 4px 20px oklch(52% 0.12 230 / 0.1)' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div
                className="hidden w-full h-full items-center justify-center text-4xl"
                style={{
                  display: 'none',
                  background: 'linear-gradient(135deg, oklch(93% 0.02 220), oklch(97% 0.008 80))',
                }}
              >
                💎
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                style={{
                  background:
                    hoveredIndex === index
                      ? 'oklch(30% 0.12 230 / 0.45)'
                      : 'transparent',
                }}
              >
                {hoveredIndex === index && (
                  <div className="flex flex-col items-center gap-2 text-white animate-in fade-in duration-200">
                    <Heart size={32} className="fill-white text-white drop-shadow-lg" />
                    <span className="text-sm font-display font-semibold drop-shadow">
                      Crystal Love ✨
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/mysticmoon_withishita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg font-display"
            style={{
              background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(65% 0.14 220), oklch(72% 0.18 55))',
              boxShadow: '0 4px 20px oklch(52% 0.12 230 / 0.3)',
            }}
          >
            <SiInstagram size={18} />
            Follow us on Instagram
          </a>
          <p className="text-muted-foreground text-sm font-body mt-3">
            Tag us <span className="font-semibold text-primary">@mysticmoon_withishita</span> to be featured here!
          </p>
        </div>
      </div>
    </section>
  );
}
