import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { Instagram } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function Services() {
  const { actor, isFetching } = useActor();

  const { data: catalog, isLoading } = useQuery({
    queryKey: ['tarot-services-catalog'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTarotServiceCatalog();
    },
    enabled: !!actor && !isFetching,
  });

  const formatPrice = (price: bigint) => {
    return `₹${price.toString()}`;
  };

  const MiniReadingsBadge = () => (
    <div className="flex justify-center mb-8">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-mystic-purple/20 to-mystic-rose/20 dark:from-mystic-purple/30 dark:to-mystic-rose/30 flex items-center justify-center border-2 border-mystic-purple/40">
          <div className="text-center">
            <div className="text-2xl mb-1">📖</div>
            <div className="text-xs font-serif font-semibold text-mystic-purple dark:text-mystic-rose leading-tight">
              Mini<br />Readings
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="border-2 border-mystic-purple/20 dark:border-mystic-purple/40 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <h4 className="text-2xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-3">
          {service.name}
        </h4>
        {service.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {service.description}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-mystic-purple dark:text-mystic-rose font-serif">
            {formatPrice(service.price)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-light">
            per session
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const CategoryHeader = ({ icon, title }: { icon: string; title: string }) => (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mystic-purple/20 to-mystic-rose/20 dark:from-mystic-purple/30 dark:to-mystic-rose/30 flex items-center justify-center border-2 border-mystic-purple/40">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
    </div>
  );

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-mystic-cream/30 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-mystic-purple dark:text-mystic-rose mb-4 font-serif">
            Tarot Reading Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover clarity and guidance through authentic tarot readings
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64 mx-auto" />
                <div className="space-y-4">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-32 w-full rounded-2xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : catalog ? (
          <div className="space-y-16">
            {/* Mini Readings */}
            {catalog.miniReadings && catalog.miniReadings.length > 0 && (
              <div>
                <MiniReadingsBadge />
                <div className="space-y-4">
                  {catalog.miniReadings.map((service) => (
                    <ServiceCard key={service.id.toString()} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Premium / In-Depth Readings */}
            {catalog.premiumExclusive && catalog.premiumExclusive.length > 0 && (
              <div>
                <CategoryHeader icon="🔥" title="Premium / In-Depth Readings" />
                <div className="space-y-4">
                  {catalog.premiumExclusive.map((service) => (
                    <ServiceCard key={service.id.toString()} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Love & Relationship Readings */}
            {catalog.loveRelationship && catalog.loveRelationship.length > 0 && (
              <div>
                <CategoryHeader icon="💖" title="Love & Relationship" />
                <div className="space-y-4">
                  {catalog.loveRelationship.map((service) => (
                    <ServiceCard key={service.id.toString()} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Career, Money & Life */}
            {catalog.careerMoneyLife && catalog.careerMoneyLife.length > 0 && (
              <div>
                <CategoryHeader icon="💼" title="Career, Money & Life" />
                <div className="space-y-4">
                  {catalog.careerMoneyLife.map((service) => (
                    <ServiceCard key={service.id.toString()} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Deep & Detailed Readings */}
            {catalog.deepDetailed && catalog.deepDetailed.length > 0 && (
              <div>
                <CategoryHeader icon="🌙" title="Deep & Detailed Readings" />
                <div className="space-y-4">
                  {catalog.deepDetailed.map((service) => (
                    <ServiceCard key={service.id.toString()} service={service} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mystic-cream dark:bg-gray-700 mb-4">
              <span className="text-3xl">🌟</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Services Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We're preparing our tarot reading services for you
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
            Book your reading through Instagram DM
          </p>
          <a
            href="https://instagram.com/MysticMoonWithIshita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-mystic-purple to-mystic-rose text-white rounded-full hover:shadow-lg hover:shadow-mystic-purple/30 transition-all duration-300 font-semibold text-lg"
          >
            <Instagram className="w-6 h-6" />
            Book Now on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
