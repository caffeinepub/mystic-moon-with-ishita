import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serviceGalleryImages } from '@/data/serviceGalleryImages';

// Fallback service card with hand-pentacle SVG when image fails to load
function FallbackServiceCard({ label }: { label: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6"
      style={{ background: 'oklch(97% 0.008 80)' }}>
      {/* Hand-pentacle SVG */}
      <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 opacity-60">
        <path d="M10 80 Q15 70 20 80 Q25 70 30 80 Q35 70 40 80" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M5 90 Q12 78 18 90 Q25 78 32 90" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M45 110 Q50 95 55 85 Q58 78 60 70 L62 60 Q63 55 65 58 L66 70 Q68 60 70 62 L71 72 Q73 63 75 65 L76 74 Q78 66 80 68 L80 80 Q82 72 84 74 L84 90 Q82 100 78 108 Q72 115 65 115 Q55 115 48 112 Z" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="75" cy="35" r="22" stroke="oklch(52% 0.12 230)" strokeWidth="1.5" fill="none" />
        <path d="M75 15 L79 27 L92 27 L82 35 L86 47 L75 39 L64 47 L68 35 L58 27 L71 27 Z" stroke="oklch(52% 0.12 230)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-sm font-semibold text-center" style={{ color: 'oklch(52% 0.12 230)' }}>
        {label}
      </span>
    </div>
  );
}

export default function ServicesGallery() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'oklch(99% 0.005 80)' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
            <span className="font-body text-sm tracking-widest uppercase" style={{ color: 'oklch(52% 0.12 230)' }}>
              ✦ Gallery ✦
            </span>
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'oklch(52% 0.12 230)' }}>
            Service Categories
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: 'oklch(45% 0.06 240)' }}>
            Explore all reading categories — each crafted with care and intuition
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceGalleryImages.map((item) => (
            <div
              key={item.category}
              className="group relative rounded-2xl overflow-hidden shadow-crystal transition-all duration-300 hover:shadow-crystal-lg hover:-translate-y-1"
              style={{ border: '1px solid oklch(72% 0.1 230 / 0.2)', aspectRatio: '4/3' }}
            >
              {/* Service image */}
              <img
                src={item.imagePath}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              {/* Fallback */}
              <div className="hidden w-full h-full" style={{ display: 'none' }}>
                <FallbackServiceCard label={item.label} />
              </div>

              {/* Hover overlay with label */}
              <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, oklch(22% 0.06 240 / 0.85) 0%, transparent 60%)' }}>
                <div className="p-4 w-full">
                  <span className="font-display text-sm font-semibold"
                    style={{ color: 'oklch(97% 0.008 80)' }}>
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Always-visible label badge at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 group-hover:opacity-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, oklch(22% 0.06 240 / 0.6) 0%, transparent 100%)' }}>
                <span className="font-display text-xs font-semibold"
                  style={{ color: 'oklch(97% 0.008 80)' }}>
                  {item.label}
                </span>
              </div>
            </div>
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
              Schedule Your Reading
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
