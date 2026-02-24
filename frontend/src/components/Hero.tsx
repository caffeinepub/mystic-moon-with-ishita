import { Instagram, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32"
      style={{ background: 'linear-gradient(180deg, oklch(97% 0.008 80) 0%, oklch(94% 0.02 220) 60%, oklch(97% 0.008 80) 100%)' }}>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large moon circle */}
        <div className="absolute top-8 right-8 md:right-16 w-48 h-48 md:w-72 md:h-72 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, oklch(52% 0.12 230 / 0.12), transparent 70%)' }} />
        {/* Sparkle dots */}
        <div className="absolute top-16 left-1/4 w-2 h-2 rounded-full animate-sparkle"
          style={{ background: 'oklch(78% 0.08 30)', animationDelay: '0s' }} />
        <div className="absolute top-32 right-1/3 w-1.5 h-1.5 rounded-full animate-sparkle"
          style={{ background: 'oklch(78% 0.08 30)', animationDelay: '0.7s' }} />
        <div className="absolute bottom-24 left-1/3 w-2 h-2 rounded-full animate-sparkle"
          style={{ background: 'oklch(78% 0.08 30)', animationDelay: '1.4s' }} />
        <div className="absolute top-24 right-1/4 w-1 h-1 rounded-full animate-sparkle"
          style={{ background: 'oklch(52% 0.12 230)', animationDelay: '0.3s' }} />
        <div className="absolute bottom-32 right-1/4 w-1.5 h-1.5 rounded-full animate-sparkle"
          style={{ background: 'oklch(52% 0.12 230)', animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Logo / Hero image */}
        <div className="flex justify-center mb-8 animate-moonrise">
          <div className="relative">
            <img
              src="/assets/generated/mystic-moon-logo.dim_400x300.png"
              alt="Mystic Moon with Ishita"
              className="w-56 md:w-72 h-auto object-contain animate-float drop-shadow-lg"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
            {/* Glow ring behind logo */}
            <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-20"
              style={{ background: 'oklch(52% 0.12 230)' }} />
          </div>
        </div>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-12 md:w-20" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
          <span className="font-body text-sm md:text-base tracking-widest uppercase"
            style={{ color: 'oklch(52% 0.12 230)' }}>
            ✦ Tarot · Crystals · Guidance ✦
          </span>
          <div className="h-px w-12 md:w-20" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
        </div>

        {/* Main heading */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ color: 'oklch(52% 0.12 230)' }}>
          Mystic Moon
          <br />
          <span className="text-gradient-crystal">with Ishita</span>
        </h1>

        {/* Description */}
        <p className="font-body text-xl md:text-2xl mb-4 max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'oklch(35% 0.06 240)' }}>
          Authentic tarot readings guided by intuition, crystals, and the wisdom of the moon.
        </p>

        {/* Star rating */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" style={{ color: 'oklch(78% 0.08 30)' }} />
          ))}
          <span className="ml-2 font-body text-base" style={{ color: 'oklch(45% 0.06 240)' }}>
            Trusted by 100+ seekers
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToServices}
            size="lg"
            className="font-display text-sm tracking-wider px-8 py-6 rounded-full shadow-crystal transition-all duration-300 hover:shadow-crystal-lg hover:scale-105"
            style={{
              background: 'oklch(52% 0.12 230)',
              color: 'oklch(99% 0.005 80)',
              border: 'none',
            }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Explore Readings
          </Button>
          <Button
            onClick={scrollToProducts}
            variant="outline"
            size="lg"
            className="font-display text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'oklch(52% 0.12 230)',
              color: 'oklch(52% 0.12 230)',
              background: 'transparent',
            }}
          >
            Shop Crystals
          </Button>
          <a
            href="https://www.instagram.com/mysticmoonwithishita"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-display text-sm tracking-wider px-8 py-4 rounded-full border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'oklch(78% 0.08 30)',
              color: 'oklch(52% 0.12 230)',
              background: 'oklch(78% 0.08 30 / 0.15)',
            }}
          >
            <Instagram className="w-4 h-4" />
            Book on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
