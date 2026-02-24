import { Heart, Star, Shield } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'oklch(99% 0.005 80)' }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
            <span className="font-body text-sm tracking-widest uppercase" style={{ color: 'oklch(52% 0.12 230)' }}>
              ✦ About ✦
            </span>
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'oklch(52% 0.12 230)' }}>
            Meet Ishita
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Portrait card */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-crystal-lg"
                style={{ border: '3px solid oklch(52% 0.12 230 / 0.3)' }}>
                <img
                  src="/assets/20260223_125651.jpg"
                  alt="Ishita - Tarot Reader"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-6xl"
                  style={{ background: 'oklch(93% 0.02 220)', display: 'none' }}>
                  🌙
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full -z-10 opacity-20"
                style={{ background: 'radial-gradient(circle, oklch(52% 0.12 230), transparent 70%)' }} />
              {/* Sparkle accents */}
              <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-lg animate-sparkle">✦</div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 flex items-center justify-center text-lg animate-sparkle" style={{ animationDelay: '1s' }}>✦</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3" style={{ color: 'oklch(52% 0.12 230)' }}>
                Your Intuitive Guide
              </h3>
              <p className="font-body text-lg leading-relaxed" style={{ color: 'oklch(35% 0.06 240)' }}>
                With over 4 years of experience in tarot reading and crystal healing, Ishita brings authentic, 
                heart-centered guidance to every session. Her strong intuition and deep connection to the cards 
                help seekers find clarity, direction, and peace.
              </p>
            </div>

            <p className="font-body text-lg leading-relaxed" style={{ color: 'oklch(45% 0.06 240)' }}>
              Every reading is a sacred space — confidential, compassionate, and completely personalized to your 
              unique journey. Whether you seek answers about love, career, or life purpose, the cards illuminate 
              the path forward.
            </p>

            {/* Feature badges */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { icon: Star, label: '4+ Years', sub: 'Experience' },
                { icon: Heart, label: '100+', sub: 'Happy Clients' },
                { icon: Shield, label: '100%', sub: 'Confidential' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center p-3 rounded-crystal crystal-card">
                  <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: 'oklch(52% 0.12 230)' }} />
                  <div className="font-display text-sm font-bold" style={{ color: 'oklch(52% 0.12 230)' }}>{label}</div>
                  <div className="font-body text-xs" style={{ color: 'oklch(52% 0.06 240)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
