import React, { useState } from 'react';
import { products, LocalProduct } from '../data/products';
import ProductCard from './ProductCard';
import { ProductType } from '../backend';

type FilterTab = 'all' | 'crystal' | 'bracelet' | 'pendulum' | 'yantra';

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filteredProducts: LocalProduct[] = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'yantra') return p.subType === 'yantra';
    if (activeTab === 'crystal') return p.productType === ProductType.crystal && p.subType !== 'yantra';
    if (activeTab === 'bracelet') return p.productType === ProductType.bracelet;
    if (activeTab === 'pendulum') return p.productType === ProductType.pendulum;
    return true;
  });

  const getCrystalCount = () =>
    products.filter((p) => p.productType === ProductType.crystal && p.subType !== 'yantra').length;
  const getBraceletCount = () =>
    products.filter((p) => p.productType === ProductType.bracelet).length;
  const getPendulumCount = () =>
    products.filter((p) => p.productType === ProductType.pendulum).length;
  const getYantraCount = () => products.filter((p) => p.subType === 'yantra').length;

  const tabs: { key: FilterTab; label: string; emoji: string; count: number }[] = [
    { key: 'all', label: 'All', emoji: '✨', count: products.length },
    { key: 'crystal', label: 'Crystals', emoji: '💎', count: getCrystalCount() },
    { key: 'bracelet', label: 'Bracelets', emoji: '📿', count: getBraceletCount() },
    { key: 'pendulum', label: 'Pendulums', emoji: '🔮', count: getPendulumCount() },
    { key: 'yantra', label: 'Yantra', emoji: '🕉️', count: getYantraCount() },
  ];

  return (
    <section id="shop" className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Holi Banner */}
        <div className="mb-10 relative overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/assets/generated/holi-banner.dim_1200x300.png"
            alt="Holi Special Sale — 20% Off on all crystals"
            className="w-full object-cover"
            style={{ maxHeight: '220px' }}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback banner */}
          <div
            className="hidden w-full items-center justify-center py-10 px-6 rounded-2xl text-center"
            style={{
              display: 'none',
              background: 'linear-gradient(135deg, oklch(65% 0.22 15), oklch(72% 0.18 55), oklch(78% 0.18 80))',
            }}
          >
            <div>
              <p className="text-white text-3xl font-bold font-display mb-1">🎨 Holi Special Sale!</p>
              <p className="text-white/90 text-lg font-body">
                Celebrate Holi with <span className="font-bold">20% OFF</span> on all crystals, bracelets & yantras
              </p>
            </div>
          </div>
          {/* Overlay text on banner */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <span
              className="inline-block text-white font-bold text-xl md:text-3xl font-display drop-shadow-lg mb-1"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              🎨 Holi Special — 20% OFF Everything!
            </span>
            <span
              className="text-white/90 text-sm md:text-base font-body drop-shadow"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              Limited time festive offer · Prices already updated below
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            ✦ Crystal Collection ✦
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Crystal Shop
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-base leading-relaxed">
            Handpicked healing crystals, bracelets, and sacred yantras — each cleansed, charged, and ready to support your journey.
            Raw stones starting from <span className="text-primary font-semibold">₹800</span> · Bracelets from <span className="text-primary font-semibold">₹640</span> · Yantras from <span className="text-primary font-semibold">₹800</span>{' '}
            <span className="text-xs font-normal">(after Holi 20% discount)</span>.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
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
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Yantra subsection label */}
        {activeTab === 'yantra' && (
          <div className="text-center mb-8">
            <p className="text-primary font-medium tracking-widest uppercase text-xs mb-1">
              🕉️ Sacred Prosperity Tools
            </p>
            <h3 className="font-display text-2xl text-foreground mb-2">
              Yantra & Mantra Collection
            </h3>
            <p className="text-muted-foreground text-sm font-body max-w-xl mx-auto">
              Powerful sacred instruments charged with divine energy to attract wealth, prosperity, and positive vibrations into your home and business.
            </p>
          </div>
        )}

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
              className="text-primary font-semibold hover:underline"
            >
              @mysticmoon_withishita
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
