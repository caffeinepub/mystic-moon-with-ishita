import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice, calculateHoliPrice, HOLI_PROMO_ACTIVE } from '../utils/pricing';
import { ProductType } from '../backend';

interface WishlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistPanel({ isOpen, onClose }: WishlistPanelProps) {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleOrder = (_productName: string, _price: number) => {
    window.open(
      `https://www.instagram.com/mysticmoon_withishita`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const totalPrice = wishlistProducts.reduce((sum, p) => {
    return sum + (HOLI_PROMO_ACTIVE ? calculateHoliPrice(p.price) : p.price);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'oklch(99% 0.005 80)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-border"
          style={{ background: 'oklch(97% 0.01 230)' }}
        >
          <div className="flex items-center gap-2">
            <Heart size={18} className="fill-red-500 text-red-500" />
            <h2 className="font-display text-lg font-semibold text-foreground">My Wishlist</h2>
            {wishlistProducts.length > 0 && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                {wishlistProducts.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label="Close wishlist"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Holi promo banner inside panel */}
        {HOLI_PROMO_ACTIVE && wishlistProducts.length > 0 && (
          <div
            className="mx-4 mt-3 px-3 py-2 rounded-lg text-xs font-medium text-white text-center"
            style={{
              background: 'linear-gradient(135deg, oklch(65% 0.22 15), oklch(72% 0.18 55))',
            }}
          >
            🎨 Holi Special — 20% OFF on all items!
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <Heart size={48} className="text-muted-foreground/30 mb-4" />
              <p className="font-display text-base text-muted-foreground mb-1">
                Your wishlist is empty
              </p>
              <p className="text-xs text-muted-foreground/70 font-body">
                Tap the ♡ on any product to save it here
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const originalPrice = product.price;
              const holiPrice = calculateHoliPrice(originalPrice);

              return (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden w-full h-full items-center justify-center text-2xl"
                      style={{ display: 'none' }}
                    >
                      {product.productType === ProductType.crystal
                        ? '💎'
                        : product.productType === ProductType.bracelet
                        ? '📿'
                        : '🔮'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-semibold text-foreground leading-tight line-clamp-1 mb-0.5">
                      {product.name}
                    </p>
                    <div className="flex flex-col mb-2">
                      {HOLI_PROMO_ACTIVE ? (
                        <>
                          {/* Holi discounted price — primary */}
                          <span className="text-sm font-bold text-primary font-display leading-tight">
                            {formatPrice(holiPrice)}
                          </span>
                          {/* Original price — labeled and struck through */}
                          <span className="text-xs text-muted-foreground leading-tight">
                            <span className="font-medium">Original:</span>{' '}
                            <span className="line-through">{formatPrice(originalPrice)}</span>
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-primary font-display">
                          {formatPrice(originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOrder(product.name, holiPrice)}
                        className="text-xs text-primary-foreground px-2.5 py-1 rounded-full font-medium transition-opacity hover:opacity-90"
                        style={{
                          background:
                            'linear-gradient(135deg, oklch(52% 0.12 230), oklch(45% 0.14 260))',
                        }}
                      >
                        <span className="flex items-center gap-1">
                          <ShoppingBag size={10} />
                          Buy
                        </span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="px-4 py-4 border-t border-border space-y-2">
            {/* Total */}
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-sm font-medium text-muted-foreground font-body">
                Total ({wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''})
              </span>
              <div className="text-right">
                <span className="text-base font-bold text-primary font-display">
                  {formatPrice(totalPrice)}
                </span>
                {HOLI_PROMO_ACTIVE && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Original:</span>{' '}
                    <span className="line-through">
                      {formatPrice(wishlistProducts.reduce((s, p) => s + p.price, 0))}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <a
              href="https://www.instagram.com/mysticmoon_withishita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(45% 0.14 260))',
              }}
            >
              <ShoppingBag size={15} />
              Order All on Instagram
            </a>

            <button
              onClick={clearWishlist}
              className="w-full py-2 text-xs text-muted-foreground hover:text-destructive transition-colors font-body"
            >
              Clear wishlist
            </button>
          </div>
        )}
      </div>
    </>
  );
}
