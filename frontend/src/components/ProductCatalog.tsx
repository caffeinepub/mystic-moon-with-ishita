import { useState } from 'react';
import { useGetAllProducts, useGetProductsByType } from '@/hooks/useQueries';
import { ProductType } from '@/backend';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

type FilterTab = 'all' | 'crystal' | 'bracelet' | 'pendulum';

const TABS: { key: FilterTab; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '✨' },
  { key: 'crystal', label: 'Crystals', emoji: '💎' },
  { key: 'bracelet', label: 'Bracelets', emoji: '📿' },
  { key: 'pendulum', label: 'Pendulums', emoji: '🔮' },
];

function ProductsGrid({ filter }: { filter: FilterTab }) {
  const allQuery = useGetAllProducts();
  const crystalQuery = useGetProductsByType(ProductType.crystal);
  const braceletQuery = useGetProductsByType(ProductType.bracelet);
  const pendulumQuery = useGetProductsByType(ProductType.pendulum);

  const queryMap = {
    all: allQuery,
    crystal: crystalQuery,
    bracelet: braceletQuery,
    pendulum: pendulumQuery,
  };

  const { data: products, isLoading, error } = queryMap[filter];

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid oklch(72% 0.1 230 / 0.2)' }}>
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="font-body text-lg" style={{ color: 'oklch(55% 0.18 25)' }}>
          Unable to load products. Please try again.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🌙</div>
        <p className="font-body text-lg" style={{ color: 'oklch(52% 0.06 240)' }}>
          No products available in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  return (
    <section id="products" className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, oklch(94% 0.02 220) 0%, oklch(97% 0.008 80) 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
            <span className="font-body text-sm tracking-widest uppercase" style={{ color: 'oklch(52% 0.12 230)' }}>
              ✦ Shop ✦
            </span>
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'oklch(52% 0.12 230)' }}>
            Crystal Shop
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: 'oklch(45% 0.06 240)' }}>
            Handpicked crystals, bracelets, and pendulums charged with intention
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-5 py-2.5 rounded-full font-display text-sm tracking-wide transition-all duration-200"
              style={
                activeTab === tab.key
                  ? {
                      background: 'oklch(52% 0.12 230)',
                      color: 'oklch(99% 0.005 80)',
                      boxShadow: '0 4px 16px oklch(52% 0.12 230 / 0.3)',
                    }
                  : {
                      background: 'oklch(99% 0.005 80)',
                      color: 'oklch(52% 0.12 230)',
                      border: '1px solid oklch(52% 0.12 230 / 0.3)',
                    }
              }
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <ProductsGrid filter={activeTab} />
      </div>
    </section>
  );
}
