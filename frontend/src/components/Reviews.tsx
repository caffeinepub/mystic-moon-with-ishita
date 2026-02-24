import { Star } from 'lucide-react';
import { reviews } from '@/data/reviews';

export default function Reviews() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'oklch(99% 0.005 80)' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
            <span className="font-body text-sm tracking-widest uppercase" style={{ color: 'oklch(52% 0.12 230)' }}>
              ✦ Testimonials ✦
            </span>
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'oklch(52% 0.12 230)' }}>
            What Seekers Say
          </h2>
          <p className="font-body text-lg" style={{ color: 'oklch(45% 0.06 240)' }}>
            {reviews.length} heartfelt reviews from our community
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl p-5 crystal-card transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars — all reviews are 5-star */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'oklch(78% 0.08 30)' }} />
                ))}
              </div>

              {/* Review text */}
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'oklch(30% 0.05 240)' }}>
                "{review.text}"
              </p>

              {/* Footer */}
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: '1px solid oklch(72% 0.1 230 / 0.15)' }}
              >
                <div>
                  <div className="font-display text-sm font-semibold" style={{ color: 'oklch(52% 0.12 230)' }}>
                    {review.name}
                  </div>
                  <div className="font-body text-xs mt-0.5" style={{ color: 'oklch(55% 0.05 240)' }}>
                    {review.date}
                  </div>
                </div>
                {review.category && (
                  <span
                    className="text-xs px-2 py-1 rounded-full font-body"
                    style={{
                      background: 'oklch(52% 0.12 230 / 0.1)',
                      color: 'oklch(52% 0.12 230)',
                      border: '1px solid oklch(52% 0.12 230 / 0.2)',
                    }}
                  >
                    {review.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
