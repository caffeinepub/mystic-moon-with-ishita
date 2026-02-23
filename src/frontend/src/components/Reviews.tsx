import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { reviews } from '../data/reviews';

export default function Reviews() {
  return (
    <section className="py-16 md:py-24 px-4 bg-mystic-cream/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-mystical text-4xl md:text-5xl text-mystic-purple mb-4">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from those who have experienced the transformative power of tarot readings and crystal healing
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="border-mystic-purple/20 hover:border-mystic-gold/40 transition-all duration-300 hover:shadow-xl bg-card/80 backdrop-blur"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <Quote className="w-8 h-8 text-mystic-gold/40" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-mystic-gold text-mystic-gold"
                      />
                    ))}
                  </div>
                </div>

                <ScrollArea className="h-32">
                  <p className="text-foreground/80 leading-relaxed text-sm">
                    {review.text}
                  </p>
                </ScrollArea>

                <div className="pt-4 border-t border-mystic-purple/10">
                  <p className="font-elegant text-mystic-purple font-semibold">
                    {review.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                    <span className="text-xs px-2 py-1 rounded-full bg-mystic-purple/10 text-mystic-purple">
                      {review.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
