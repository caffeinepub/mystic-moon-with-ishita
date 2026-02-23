import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { Sparkles, Moon, Star, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function Services() {
  const { actor, isFetching } = useActor();

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });

  const serviceIcons = [
    { icon: Sparkles, color: 'text-mystic-purple' },
    { icon: Moon, color: 'text-mystic-rose' },
    { icon: Star, color: 'text-mystic-gold' },
    { icon: Heart, color: 'text-mystic-purple' },
  ];

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-mystic-cream/30 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-mystic-purple dark:text-mystic-rose mb-4 font-serif">
            Spiritual Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover guidance and healing through our authentic spiritual offerings
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-mystic-purple/20">
                <CardHeader>
                  <Skeleton className="h-12 w-12 rounded-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[index % serviceIcons.length].icon;
              const iconColor = serviceIcons[index % serviceIcons.length].color;
              
              return (
                <Card
                  key={service.id.toString()}
                  className="border-mystic-purple/20 hover:border-mystic-purple/40 transition-all duration-300 hover:shadow-lg hover:shadow-mystic-purple/10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full bg-mystic-cream dark:bg-gray-700 flex items-center justify-center mb-4 ${iconColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-serif text-mystic-purple dark:text-mystic-rose">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-mystic-gold">
                      ₹{service.price.toString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mystic-cream dark:bg-gray-700 mb-4">
              <Sparkles className="w-8 h-8 text-mystic-purple dark:text-mystic-rose" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Services Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We're preparing our spiritual service offerings for you
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Book your session through Instagram DM
          </p>
          <a
            href="https://instagram.com/MysticMoonWithIshita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-mystic-purple to-mystic-rose text-white rounded-full hover:shadow-lg hover:shadow-mystic-purple/30 transition-all duration-300 font-semibold"
          >
            <Heart className="w-5 h-5" />
            Contact on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
