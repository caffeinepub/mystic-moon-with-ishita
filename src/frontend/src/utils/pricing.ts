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
