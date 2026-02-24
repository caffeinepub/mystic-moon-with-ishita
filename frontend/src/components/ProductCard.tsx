import { Badge } from '@/components/ui/badge';
import { Product, ProductType } from '@/backend';
import { formatPrice, calculateFinalPrice } from '@/utils/pricing';

interface ProductCardProps {
  product: Product;
}

const TYPE_CONFIG: Record<ProductType, { label: string; emoji: string }> = {
  [ProductType.crystal]: { label: 'Crystal', emoji: '💎' },
  [ProductType.bracelet]: { label: 'Bracelet', emoji: '📿' },
  [ProductType.pendulum]: { label: 'Pendulum', emoji: '🔮' },
};

export default function ProductCard({ product }: ProductCardProps) {
  const typeConfig = TYPE_CONFIG[product.productType] ?? { label: 'Item', emoji: '✨' };
  const finalPrice = calculateFinalPrice(Number(product.price));

  return (
    <div className="group rounded-2xl overflow-hidden crystal-card transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        {/* Fallback */}
        <div className="hidden w-full h-full items-center justify-center text-5xl"
          style={{ background: 'oklch(93% 0.02 220)', display: 'none' }}>
          {typeConfig.emoji}
        </div>

        {/* Trending badge */}
        {product.isTrending && (
          <div className="absolute top-3 left-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-display font-semibold"
              style={{
                background: 'oklch(78% 0.08 30)',
                color: 'oklch(25% 0.06 240)',
              }}>
              ✦ Trending
            </span>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-3 right-3">
          <span className="text-xs px-2.5 py-1 rounded-full font-display"
            style={{
              background: 'oklch(52% 0.12 230 / 0.9)',
              color: 'oklch(99% 0.005 80)',
            }}>
            {typeConfig.emoji} {typeConfig.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-sm font-bold mb-1 line-clamp-1" style={{ color: 'oklch(25% 0.06 240)' }}>
          {product.name}
        </h3>
        <p className="font-body text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: 'oklch(45% 0.06 240)' }}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-base font-bold" style={{ color: 'oklch(52% 0.12 230)' }}>
            {formatPrice(finalPrice)}
          </span>
          <a
            href="https://www.instagram.com/mysticmoonwithishita"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-full font-display transition-all duration-200 hover:scale-105"
            style={{
              background: 'oklch(52% 0.12 230 / 0.1)',
              color: 'oklch(52% 0.12 230)',
              border: '1px solid oklch(52% 0.12 230 / 0.3)',
            }}
          >
            Order
          </a>
        </div>
      </div>
    </div>
  );
}
