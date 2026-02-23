import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculateFinalPrice, formatPrice } from '../utils/pricing';

interface Product {
  id: string;
  name: string;
  description: string;
  type: 'crystal' | 'bracelet' | 'pendulum';
  basePrice: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const finalPrice = calculateFinalPrice(product.basePrice);

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'crystal':
        return 'Crystal';
      case 'bracelet':
        return 'Bracelet';
      case 'pendulum':
        return 'Pendulum';
      default:
        return type;
    }
  };

  return (
    <Card className="group overflow-hidden border-mystic-purple/20 hover:border-mystic-gold/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card/80 backdrop-blur">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-mystic-purple/90 text-white border-mystic-gold/30"
            >
              {getProductTypeLabel(product.type)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-elegant text-xl text-mystic-purple mb-2">
          {product.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex items-center justify-between">
          <span className="font-elegant text-2xl text-mystic-gold font-bold">
            {formatPrice(finalPrice)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
