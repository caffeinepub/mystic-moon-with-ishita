import React from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../data/reviews';

interface ProductReviewsProps {
  productId: string;
}

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-current' : 'fill-none'}
          style={{ color: 'oklch(72% 0.18 55)' }}
        />
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const productReviews = reviews.filter((r) => r.productId === productId);

  if (productReviews.length === 0) {
    return (
      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center py-2 font-body italic">
          ✨ Be the first to review this crystal
        </p>
      </div>
    );
  }

  const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      {/* Average rating summary */}
      <div className="flex items-center gap-2 mb-2">
        <StarRating rating={Math.round(avgRating)} size={11} />
        <span className="text-xs text-muted-foreground font-body">
          {avgRating.toFixed(1)} ({productReviews.length} review{productReviews.length !== 1 ? 's' : ''})
        </span>
      </div>

      {/* Individual reviews */}
      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
        {productReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-lg p-2 text-xs"
            style={{ background: 'oklch(97% 0.008 80)' }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold font-display" style={{ color: 'oklch(40% 0.12 230)' }}>
                {review.name}
              </span>
              <StarRating rating={review.rating} size={10} />
            </div>
            <p className="text-muted-foreground font-body leading-relaxed line-clamp-3">
              {review.text}
            </p>
            <p className="text-muted-foreground/60 mt-1 text-[10px]">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
