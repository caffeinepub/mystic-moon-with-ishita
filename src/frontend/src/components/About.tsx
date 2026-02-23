import { Heart, Sparkles, Moon, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-mystic-cream/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-mystical text-4xl md:text-5xl text-mystic-purple mb-4 flex items-center justify-center gap-3">
            <Moon className="w-8 h-8 text-mystic-gold" />
            About Ishita
            <Moon className="w-8 h-8 text-mystic-gold" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <Card className="border-mystic-purple/20 shadow-xl bg-card/80 backdrop-blur">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-mystic-rose flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-elegant text-2xl text-mystic-purple mb-2">
                      A Genuine Healer with Strong Intuition
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      With 4 years of dedicated experience in the sacred art of tarot reading and spiritual healing, 
                      Ishita brings authentic wisdom and profound intuitive guidance to every session. Her genuine 
                      connection to the spiritual realm allows her to provide clarity, comfort, and transformative 
                      insights to those seeking answers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-mystic-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-elegant text-xl text-mystic-purple mb-2">
                      Authentic Tarot Reading Expertise
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      As an authentic tarot reader, Ishita combines traditional wisdom with intuitive insight to 
                      illuminate your path forward. Her readings are compassionate, honest, and deeply personal, 
                      helping you navigate life's challenges with confidence and clarity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-mystic-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-elegant text-xl text-mystic-purple mb-2">
                      Crystal Energy & Healing
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Beyond tarot, Ishita carefully curates authentic crystals and crystal jewelry, each piece 
                      selected for its unique energetic properties. Her deep understanding of crystal healing 
                      ensures you receive the perfect stones to support your spiritual journey and personal growth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-mystic-purple/30 to-mystic-rose/30 rounded-2xl blur-2xl" />
              <img
                src="/assets/generated/healer-portrait.dim_600x800.png"
                alt="Ishita - Tarot Reader and Spiritual Healer"
                className="relative rounded-2xl shadow-2xl border-4 border-mystic-gold/30 max-w-sm w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
