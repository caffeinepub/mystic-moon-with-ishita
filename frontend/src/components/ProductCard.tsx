import React, { useState } from 'react';
import { LocalProduct } from '../data/products';
import { ProductType } from '../backend';

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

  const displayPrice = product.price;

  return (
    <div className="crystal-card group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:shadow-crystal transition-all duration-300 hover:-translate-y-1">
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

        {/* Trending badge */}
        {product.isTrending && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
            🔥 Trending
          </div>
        )}

        {/* Type badge */}
        <div
          className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full border ${TYPE_COLORS[product.productType]}`}
        >
          {TYPE_LABELS[product.productType]}
        </div>
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
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-base font-bold text-primary font-display">
              ₹{displayPrice}
            </span>
            <span className="text-xs text-muted-foreground ml-1">onwards</span>
          </div>
          <a
            href="https://www.instagram.com/mysticmoon_withishita"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:bg-primary/90 transition-colors font-medium"
          >
            Order →
          </a>
        </div>
      </div>
    </div>
  );
}
