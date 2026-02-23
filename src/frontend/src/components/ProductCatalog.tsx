import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

type ProductType = 'all' | 'crystal' | 'bracelet' | 'pendulum';

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<ProductType>('all');

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.type === activeTab);

  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-mystic-purple dark:text-mystic-rose mb-4 font-serif">
            Sacred Crystal Collection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Handpicked crystals and spiritual tools to enhance your journey
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProductType)} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8 bg-mystic-cream/50 dark:bg-gray-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-mystic-purple data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="crystal" className="data-[state=active]:bg-mystic-purple data-[state=active]:text-white">
              Crystals
            </TabsTrigger>
            <TabsTrigger value="bracelet" className="data-[state=active]:bg-mystic-purple data-[state=active]:text-white">
              Bracelets
            </TabsTrigger>
            <TabsTrigger value="pendulum" className="data-[state=active]:bg-mystic-purple data-[state=active]:text-white">
              Pendulums
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No products found in this category
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
