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

  const HandPentacleDecoration = ({ className = "" }: { className?: string }) => (
    <div className={`flex justify-center ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full max-w-md h-auto opacity-70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Clouds on left */}
        <path
          d="M 50 100 Q 40 90 50 80 Q 60 70 70 80 Q 80 70 90 80 Q 100 90 90 100 Q 80 110 70 100 Q 60 110 50 100 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/40"
        />
        <path
          d="M 60 120 Q 50 110 60 100 Q 70 90 80 100 Q 90 90 100 100 Q 110 110 100 120 Q 90 130 80 120 Q 70 130 60 120 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/40"
        />
        <path
          d="M 70 140 Q 60 130 70 120 Q 80 110 90 120 Q 100 110 110 120 Q 120 130 110 140 Q 100 150 90 140 Q 80 150 70 140 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/40"
        />
        
        {/* Hand */}
        <path
          d="M 150 150 Q 140 140 145 130 L 150 100 Q 152 90 155 100 L 160 130 Q 165 140 160 150 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/60"
        />
        
        {/* Pentacle circle */}
        <circle
          cx="200"
          cy="80"
          r="40"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/60"
        />
        
        {/* Pentacle star */}
        <path
          d="M 200 45 L 210 70 L 237 70 L 215 85 L 223 110 L 200 95 L 177 110 L 185 85 L 163 70 L 190 70 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/60"
        />
        
        {/* Clouds on right */}
        <path
          d="M 290 100 Q 280 90 290 80 Q 300 70 310 80 Q 320 70 330 80 Q 340 90 330 100 Q 320 110 310 100 Q 300 110 290 100 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/40"
        />
        <path
          d="M 300 120 Q 290 110 300 100 Q 310 90 320 100 Q 330 90 340 100 Q 350 110 340 120 Q 330 130 320 120 Q 310 130 300 120 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/40"
        />
        <path
          d="M 310 140 Q 300 130 310 120 Q 320 110 330 120 Q 340 110 350 120 Q 360 130 350 140 Q 340 150 330 140 Q 320 150 310 140 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-mystic-purple/40"
        />
      </svg>
    </div>
  );

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-mystic-cream/30 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
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
                    <Skeleton key={j} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : catalog ? (
          <div className="space-y-12">
            {/* Mini Readings */}
            {catalog.miniReadings && catalog.miniReadings.length > 0 && (
              <Card className="border-mystic-purple/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <HandPentacleDecoration className="mb-6" />
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-serif inline-flex items-center gap-3 justify-center">
                      <span className="text-4xl">🌟</span>
                      Mini Readings
                    </h3>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {catalog.miniReadings.map((service) => (
                      <div
                        key={service.id.toString()}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <span className="text-lg mt-1">•</span>
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed">
                            <span className="font-semibold">{service.name}</span>
                            {' – '}
                            <span className="font-bold text-mystic-gold">{formatPrice(service.price)}</span>
                            {service.description && (
                              <span className="text-gray-600 dark:text-gray-400">
                                {' '}({service.description})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <HandPentacleDecoration className="mt-6 transform rotate-180" />
                </CardContent>
              </Card>
            )}

            {/* Love & Relationship Readings */}
            {catalog.loveRelationship && catalog.loveRelationship.length > 0 && (
              <Card className="border-mystic-rose/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <HandPentacleDecoration className="mb-6" />
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-serif inline-flex items-center gap-3 justify-center">
                      <span className="text-4xl">💖</span>
                      Love & Relationship Readings
                    </h3>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {catalog.loveRelationship.map((service) => (
                      <div
                        key={service.id.toString()}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <span className="text-lg mt-1">•</span>
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed">
                            <span className="font-semibold">{service.name}</span>
                            {' – '}
                            <span className="font-bold text-mystic-gold">{formatPrice(service.price)}</span>
                            {service.description && (
                              <span className="text-gray-600 dark:text-gray-400">
                                {' '}({service.description})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <HandPentacleDecoration className="mt-6 transform rotate-180" />
                </CardContent>
              </Card>
            )}

            {/* Career / Money / Life */}
            {catalog.careerMoneyLife && catalog.careerMoneyLife.length > 0 && (
              <Card className="border-mystic-gold/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <HandPentacleDecoration className="mb-6" />
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-serif inline-flex items-center gap-3 justify-center">
                      <span className="text-4xl">💼</span>
                      Career / Money / Life
                    </h3>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {catalog.careerMoneyLife.map((service) => (
                      <div
                        key={service.id.toString()}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <span className="text-lg mt-1">•</span>
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed">
                            <span className="font-semibold">{service.name}</span>
                            {' – '}
                            <span className="font-bold text-mystic-gold">{formatPrice(service.price)}</span>
                            {service.description && (
                              <span className="text-gray-600 dark:text-gray-400">
                                {' '}({service.description})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <HandPentacleDecoration className="mt-6 transform rotate-180" />
                </CardContent>
              </Card>
            )}

            {/* Deep & Detailed Readings */}
            {catalog.deepDetailed && catalog.deepDetailed.length > 0 && (
              <Card className="border-indigo-300 dark:border-indigo-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <HandPentacleDecoration className="mb-6" />
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-serif inline-flex items-center gap-3 justify-center">
                      <span className="text-4xl">🌙</span>
                      Deep & Detailed Readings
                    </h3>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {catalog.deepDetailed.map((service) => (
                      <div
                        key={service.id.toString()}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <span className="text-lg mt-1">•</span>
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed">
                            <span className="font-semibold">{service.name}</span>
                            {' – '}
                            <span className="font-bold text-mystic-gold">{formatPrice(service.price)}</span>
                            {service.description && (
                              <span className="text-gray-600 dark:text-gray-400">
                                {' '}({service.description})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <HandPentacleDecoration className="mt-6 transform rotate-180" />
                </CardContent>
              </Card>
            )}

            {/* Premium / Exclusive */}
            {catalog.premiumExclusive && catalog.premiumExclusive.length > 0 && (
              <Card className="border-orange-300 dark:border-orange-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <HandPentacleDecoration className="mb-6" />
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-serif inline-flex items-center gap-3 justify-center">
                      <span className="text-4xl">🔥</span>
                      Premium / Exclusive
                    </h3>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {catalog.premiumExclusive.map((service) => (
                      <div
                        key={service.id.toString()}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <span className="text-lg mt-1">•</span>
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed">
                            <span className="font-semibold">{service.name}</span>
                            {' – '}
                            {service.isUrgent ? (
                              <span className="font-bold text-mystic-gold">+ {formatPrice(service.price)} extra</span>
                            ) : (
                              <span className="font-bold text-mystic-gold">{formatPrice(service.price)}</span>
                            )}
                            {service.description && (
                              <span className="text-gray-600 dark:text-gray-400">
                                {' '}({service.description})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <HandPentacleDecoration className="mt-6 transform rotate-180" />
                </CardContent>
              </Card>
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
