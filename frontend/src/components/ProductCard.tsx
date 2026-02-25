import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { LocalProduct } from '../data/products';
import { ProductType } from '../backend';
import { formatPrice, calculateHoliPrice, HOLI_PROMO_ACTIVE } from '../utils/pricing';
import { useWishlist } from '../hooks/useWishlist';
import { useLoyaltyPoints } from '../hooks/useLoyaltyPoints';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';

interface ProductCardProps {
  product: LocalProduct;
}

const TYPE_LABELS: Record<ProductType, string> = {
  [ProductType.crystal]: 'Raw Crystal',
  [ProductType.bracelet]: 'Bracelet',
  [ProductType.pendulum]: 'Pendulum',
};

const TYPE_COLORS: Record<ProductType, string> = {
  [ProductType.crystal]: 'bg-primary/10 text-primary border-primary/20',
  [ProductType.bracelet]: 'bg-accent/10 text-accent-foreground border-accent/20',
  [ProductType.pendulum]: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { awardWishlistPoints } = useLoyaltyPoints();

  const originalPrice = product.price;
  const holiPrice = calculateHoliPrice(originalPrice);
  const wishlisted = isWishlisted(product.id);

  const handleOrder = () => {
    window.open(
      `https://www.instagram.com/mysticmoon_withishita`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wasWishlisted = isWishlisted(product.id);
    toggleWishlist(product.id);
    // Award points only when adding (not removing)
    if (!wasWishlisted) {
      awardWishlistPoints(product.id);
    }
  };

  return (
    <div
      id={`product-${product.id}`}
      className="crystal-card group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:shadow-crystal transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imgError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <span className="text-4xl mb-2">
              {product.productType === ProductType.crystal
                ? '💎'
                : product.productType === ProductType.bracelet
                ? '📿'
                : '🔮'}
            </span>
            <span className="text-xs text-muted-foreground text-center px-2">{product.name}</span>
          </div>
        )}

        {/* Holi Sale badge */}
        {HOLI_PROMO_ACTIVE && (
          <div
            className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
            style={{
              background: 'linear-gradient(135deg, oklch(65% 0.22 15), oklch(72% 0.18 55))',
              color: 'white',
              letterSpacing: '0.02em',
            }}
          >
            🎨 Holi Sale
          </div>
        )}

        {/* Trending badge */}
        {product.isTrending && (
          <div className="absolute bottom-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
            🔥 Trending
          </div>
        )}

        {/* Type badge */}
        <div
          className={`absolute top-2 right-8 text-xs font-medium px-2 py-0.5 rounded-full border ${TYPE_COLORS[product.productType]}`}
        >
          {product.subType === 'yantra' ? '🕉️ Yantra' : TYPE_LABELS[product.productType]}
        </div>

        {/* Wishlist heart button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-1 right-1 w-7 h-7 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform duration-150 z-10"
        >
          <Heart
            size={14}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        <h3 className="font-display text-sm font-semibold text-foreground leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>

        {/* Price + Order */}
        <div className="flex items-center justify-between mt-auto gap-1">
          <div className="flex flex-col gap-0.5">
            {HOLI_PROMO_ACTIVE ? (
              <>
                <span className="text-base font-bold text-primary font-display leading-tight">
                  {formatPrice(holiPrice)}
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  <span className="font-medium">Original:</span>{' '}
                  <span className="line-through">{formatPrice(originalPrice)}</span>
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-primary font-display">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleOrder}
            className="text-xs text-primary-foreground px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity font-medium shadow-sm flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(45% 0.14 260))',
            }}
          >
            Buy →
          </button>
        </div>

        {/* Reviews toggle */}
        <button
          onClick={() => setShowReviews((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-body w-full justify-center py-1 rounded-lg hover:bg-primary/5"
        >
          {showReviews ? (
            <>
              <ChevronUp size={12} />
              Hide Reviews
            </>
          ) : (
            <>
              <ChevronDown size={12} />
              Show Reviews
            </>
          )}
        </button>

        {/* Reviews section (collapsible) */}
        {showReviews && <ProductReviews productId={product.id} />}

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} productType={product.productType} />
      </div>
    </div>
  );
}
