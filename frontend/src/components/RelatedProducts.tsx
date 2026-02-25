import React from 'react';
import { products, LocalProduct } from '../data/products';
import { ProductType } from '../backend';
import { formatPrice, calculateHoliPrice, HOLI_PROMO_ACTIVE } from '../utils/pricing';

interface RelatedProductsProps {
  currentProductId: string;
  productType: ProductType;
}

export default function RelatedProducts({ currentProductId, productType }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.productType === productType && p.id !== currentProductId)
    .slice(0, 3);

  if (related.length === 0) return null;

  const handleClick = (product: LocalProduct) => {
    const el = document.getElementById(`product-${product.id}`);
    if (el) {
      const headerOffset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-display">
        Customers Also Bought
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {related.map((product) => {
          const price = HOLI_PROMO_ACTIVE ? calculateHoliPrice(product.price) : product.price;
          return (
            <button
              key={product.id}
              onClick={() => handleClick(product)}
              className="flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 w-20 text-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-[10px] text-foreground font-body leading-tight line-clamp-2">
                {product.name}
              </span>
              <span className="text-[10px] font-bold font-display" style={{ color: 'oklch(52% 0.12 230)' }}>
                {formatPrice(price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
