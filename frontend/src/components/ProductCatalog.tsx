import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { products, LocalProduct } from '../data/products';
import ProductCard from './ProductCard';
import { ProductType } from '../backend';

type FilterTab = 'all' | 'crystal' | 'bracelet' | 'pendulum';

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filteredProducts: LocalProduct[] = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'crystal') return p.productType === ProductType.crystal;
    if (activeTab === 'bracelet') return p.productType === ProductType.bracelet;
    if (activeTab === 'pendulum') return p.productType === ProductType.pendulum;
    return true;
  });

  const tabs: { key: FilterTab; label: string; emoji: string }[] = [
    { key: 'all', label: 'All', emoji: '✨' },
    { key: 'crystal', label: 'Crystals', emoji: '💎' },
    { key: 'bracelet', label: 'Bracelets', emoji: '📿' },
    { key: 'pendulum', label: 'Pendulums', emoji: '🔮' },
  ];

  return (
    <section id="shop" className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            ✦ Crystal Collection ✦
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Crystal Shop
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-base leading-relaxed">
            Handpicked healing crystals and bracelets — each cleansed, charged, and ready to support your journey.
            Raw stones starting from <span className="text-primary font-semibold">₹600</span> · Bracelets from <span className="text-primary font-semibold">₹800</span>.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const count =
              tab.key === 'all'
                ? products.length
                : products.filter((p) =>
                    tab.key === 'crystal'
                      ? p.productType === ProductType.crystal
                      : tab.key === 'bracelet'
                      ? p.productType === ProductType.bracelet
                      : p.productType === ProductType.pendulum
                  ).length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                  transition-all duration-200 border
                  ${
                    activeTab === tab.key
                      ? 'bg-primary text-primary-foreground border-primary shadow-crystal'
                      : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }
                `}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                <span
                  className={`
                    text-xs px-1.5 py-0.5 rounded-full
                    ${activeTab === tab.key ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body">
            <p className="text-4xl mb-4">🔮</p>
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm font-body">
            💌 To order, DM on Instagram{' '}
            <a
              href="https://www.instagram.com/mysticmoon_withishita"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              @mysticmoon_withishita
            </a>{' '}
            or WhatsApp{' '}
            <a
              href="https://wa.me/919305831180"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              +91 9305831180
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
