/**
 * Calculate the final price by adding the markup to the base price
 * @param basePrice - The base price of the product (minimum ₹500)
 * @returns The final price (basePrice + ₹400)
 */
export function calculateFinalPrice(basePrice: number): number {
  const markup = 400;
  return basePrice + markup;
}

/**
 * Format a price value as Indian Rupees with the ₹ symbol
 * @param price - The price to format
 * @returns Formatted price string with ₹ symbol
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Holi discount percentage (20% off)
 */
export const HOLI_DISCOUNT_PERCENTAGE = 20;

/**
 * Whether the Holi promotion is currently active
 */
export const HOLI_PROMO_ACTIVE = true;

/**
 * Calculate the Holi discounted price
 * @param originalPrice - The original price
 * @returns The discounted price after applying HOLI_DISCOUNT_PERCENTAGE
 */
export function calculateHoliPrice(originalPrice: number): number {
  const discount = Math.round((originalPrice * HOLI_DISCOUNT_PERCENTAGE) / 100);
  return originalPrice - discount;
}
