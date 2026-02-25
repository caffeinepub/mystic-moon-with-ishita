import { useState, useEffect, useCallback } from 'react';

const WISHLIST_KEY = 'mystic-moon-wishlist';

function loadWishlist(): string[] {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]): void {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage errors
  }
}

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => loadWishlist());

  useEffect(() => {
    saveWishlist(wishlistIds);
  }, [wishlistIds]);

  const addToWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  return {
    wishlistIds,
    wishlistCount: wishlistIds.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
  };
}
