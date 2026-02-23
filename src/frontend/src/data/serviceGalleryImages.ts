// Service gallery image data organized by category
export interface ServiceGalleryImage {
  category: string;
  label: string;
  imagePath: string;
}

export const serviceGalleryImages: ServiceGalleryImage[] = [
  // 1. Career/Money/Life section header
  {
    category: 'Career / Money / Life',
    label: 'Career Guidance Reading - Guidance on career path, job changes, promotions',
    imagePath: '/assets/Screenshot_20260223-202001_Instagram-2.jpg',
  },
  
  // 2. Love & Relationship services
  {
    category: 'Love & Relationship',
    label: 'Love Guidance, No Contact/Separation, Does He/She Love Me',
    imagePath: '/assets/Screenshot_20260223-202059_Instagram-2.jpg',
  },
  
  // 3. Future of This Connection and Deep & Detailed header
  {
    category: 'Deep & Detailed',
    label: 'Future of This Connection & Full Tarot Spread (6-8 cards)',
    imagePath: '/assets/Screenshot_20260223-202107_Instagram-2.jpg',
  },
  
  // 4. 1 Month Forecast and 3 Month Forecast with Schedule Your Reading button
  {
    category: 'Forecasts',
    label: '1 Month Forecast & 3 Month Forecast - Detailed forecast for upcoming months',
    imagePath: '/assets/Screenshot_20260223-202112_Instagram-2.jpg',
  },
  
  // 5. Money & Abundance Reading and Life Purpose/Direction Reading
  {
    category: 'Career / Money / Life',
    label: 'Money & Abundance Reading, Life Purpose/Direction Reading',
    imagePath: '/assets/Screenshot_20260223-202008_Instagram-2.jpg',
  },
  
  // 6. Personalized Voice Note Reading and Emergency Same-Day Reading
  {
    category: 'Premium / Exclusive',
    label: 'Personalized Voice Note Reading & Emergency Same-Day Reading',
    imagePath: '/assets/Screenshot_20260223-202048_Instagram-2.jpg',
  },
  
  // 7. Mini Readings with 1 Question Reading and 3 Card Reading
  {
    category: 'Mini Readings',
    label: '1 Question Reading & 3 Card Reading - Quick insights',
    imagePath: '/assets/Screenshot_20260223-202025_Instagram-2.jpg',
  },
  
  // 8. Premium/Exclusive with Soulmate/Twin Flame Reading
  {
    category: 'Premium / Exclusive',
    label: 'Soulmate/Twin Flame Reading & Personalized Voice Note Reading',
    imagePath: '/assets/Screenshot_20260223-202043_Instagram-2.jpg',
  },
];
