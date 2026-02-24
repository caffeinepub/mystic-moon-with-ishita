// Service gallery image data organized by category
export interface ServiceGalleryImage {
  category: string;
  label: string;
  imagePath: string;
}

export const serviceGalleryImages: ServiceGalleryImage[] = [
  // Mini Readings
  {
    category: 'Mini Readings',
    label: '1 Question Reading & 3 Card Reading',
    imagePath: '/assets/Screenshot_20260223-061642_Gallery-3.jpg',
  },
  
  // Love & Relationship
  {
    category: 'Love & Relationship',
    label: 'Love Guidance, No Contact/Separation, Does He/She Love Me, Future of Connection',
    imagePath: '/assets/Screenshot_20260223-061650_Gallery-3.jpg',
  },
  
  // Career / Money / Life
  {
    category: 'Career / Money / Life',
    label: 'Career Guidance, Money & Abundance, Life Purpose/Direction',
    imagePath: '/assets/Screenshot_20260223-061655_Gallery-3.jpg',
  },
  
  // Deep & Detailed
  {
    category: 'Deep & Detailed',
    label: 'Full Tarot Spread, 1 Month Forecast, 3 Month Forecast',
    imagePath: '/assets/Screenshot_20260223-061657_Gallery-3.jpg',
  },
  
  // Premium / Exclusive
  {
    category: 'Premium / Exclusive',
    label: 'Soulmate/Twin Flame, Personalized Voice Note, Emergency Same-Day',
    imagePath: '/assets/Screenshot_20260223-061700_Gallery-3.jpg',
  },
  
  // Important Notes
  {
    category: 'Important Notes',
    label: 'Delivery, Format, Restrictions, Confidentiality',
    imagePath: '/assets/Screenshot_20260223-061702_Gallery-3.jpg',
  },
];
