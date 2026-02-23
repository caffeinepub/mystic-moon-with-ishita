export interface Product {
  id: string;
  name: string;
  description: string;
  type: 'crystal' | 'bracelet' | 'pendulum';
  basePrice: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 'amethyst-cluster',
    name: 'Amethyst Cluster',
    description: 'Natural amethyst cluster for spiritual protection and intuition enhancement',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/amethyst-cluster.dim_800x800.png',
  },
  {
    id: 'rose-quartz-tumbled',
    name: 'Rose Quartz',
    description: 'Tumbled rose quartz stone for love, compassion, and emotional healing',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/rose-quartz-tumbled.dim_800x800.png',
  },
  {
    id: 'clear-quartz-point',
    name: 'Clear Quartz Point',
    description: 'Natural clear quartz crystal point for amplifying energy and clarity',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/clear-quartz-point.dim_800x800.png',
  },
  {
    id: 'black-tourmaline',
    name: 'Black Tourmaline',
    description: 'Powerful protection stone that shields against negative energy',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/black-tourmaline.dim_800x800.png',
  },
  {
    id: 'citrine-cluster',
    name: 'Citrine Cluster',
    description: 'Natural citrine for abundance, prosperity, and positive energy',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/citrine-cluster.dim_800x800.png',
  },
  {
    id: 'selenite-wand',
    name: 'Selenite Wand',
    description: 'Pure selenite wand for cleansing and charging other crystals',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/selenite-wand.dim_800x800.png',
  },
  {
    id: 'labradorite',
    name: 'Labradorite',
    description: 'Mystical labradorite stone for transformation and spiritual awakening',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/labradorite.dim_800x800.png',
  },
  {
    id: 'green-aventurine',
    name: 'Green Aventurine',
    description: 'Lucky stone for prosperity, growth, and new opportunities',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/green-aventurine.dim_800x800.png',
  },
  {
    id: 'lapis-lazuli',
    name: 'Lapis Lazuli',
    description: 'Ancient wisdom stone for truth, enlightenment, and inner vision',
    type: 'crystal',
    basePrice: 500,
    imageUrl: '/assets/generated/lapis-lazuli.dim_800x800.png',
  },
  {
    id: 'amethyst-bracelet',
    name: 'Amethyst Bracelet',
    description: 'Beautiful amethyst bead bracelet for daily spiritual protection',
    type: 'bracelet',
    basePrice: 500,
    imageUrl: '/assets/generated/amethyst-bracelet.dim_800x800.png',
  },
  {
    id: 'tiger-eye-bracelet',
    name: 'Tiger Eye Bracelet',
    description: 'Tiger eye bracelet for courage, confidence, and grounding',
    type: 'bracelet',
    basePrice: 500,
    imageUrl: '/assets/generated/tiger-eye-bracelet.dim_800x800.png',
  },
  {
    id: 'chakra-bracelet',
    name: '7 Chakra Bracelet',
    description: 'Multi-stone chakra bracelet for balancing all energy centers',
    type: 'bracelet',
    basePrice: 500,
    imageUrl: '/assets/generated/chakra-bracelet.dim_800x800.png',
  },
  {
    id: 'black-onyx-bracelet',
    name: 'Black Onyx Bracelet',
    description: 'Protective black onyx bracelet for strength and resilience',
    type: 'bracelet',
    basePrice: 500,
    imageUrl: '/assets/generated/black-onyx-bracelet.dim_800x800.png',
  },
  {
    id: 'moonstone-bracelet',
    name: 'Moonstone Bracelet',
    description: 'Luminous moonstone bracelet for intuition and feminine energy',
    type: 'bracelet',
    basePrice: 500,
    imageUrl: '/assets/generated/moonstone-bracelet.dim_800x800.png',
  },
  {
    id: 'carnelian-bracelet',
    name: 'Carnelian Bracelet',
    description: 'Vibrant carnelian bracelet for creativity, motivation, and vitality',
    type: 'bracelet',
    basePrice: 500,
    imageUrl: '/assets/generated/carnelian-bracelet.dim_800x800.png',
  },
];
