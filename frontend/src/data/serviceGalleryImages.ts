export interface ServiceGalleryImage {
  category: string;
  label: string;
  imagePath: string;
}

export const serviceGalleryImages: ServiceGalleryImage[] = [
  {
    category: 'miniReading',
    label: '🌟 Mini Readings',
    imagePath: '/assets/generated/service-mini-readings-banner.dim_800x500.png',
  },
  {
    category: 'loveRelationship',
    label: '💖 Love & Relationship Readings',
    imagePath: '/assets/generated/service-love-relationship-banner.dim_800x500.png',
  },
  {
    category: 'careerMoneyLife',
    label: '💼 Career / Money / Life',
    imagePath: '/assets/generated/service-career-money-life-banner.dim_800x500.png',
  },
  {
    category: 'deepDetailed',
    label: '🌙 Deep & Detailed Readings',
    imagePath: '/assets/generated/service-deep-detailed-banner.dim_800x500.png',
  },
  {
    category: 'premiumExclusive',
    label: '🔥 Premium / Exclusive',
    imagePath: '/assets/generated/service-premium-exclusive-banner.dim_800x500.png',
  },
];
