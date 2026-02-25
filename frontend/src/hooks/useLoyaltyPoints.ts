import { useState, useCallback } from 'react';

const LOYALTY_KEY = 'moonlightPoints';
const WISHLIST_AWARDED_KEY = 'moonlightPointsWishlistAwarded';

export interface RewardTier {
  points: number;
  discount: string;
  label: string;
}

const REWARD_TIERS: RewardTier[] = [
  { points: 50, discount: '5%', label: '5% off your next order' },
  { points: 100, discount: '10%', label: '10% off your next order' },
  { points: 200, discount: '20%', label: '20% off your next order' },
];

function loadPoints(): number {
  try {
    const stored = localStorage.getItem(LOYALTY_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

function savePoints(points: number): void {
  try {
    localStorage.setItem(LOYALTY_KEY, String(points));
  } catch {
    // ignore
  }
}

function loadAwardedWishlistIds(): string[] {
  try {
    const stored = localStorage.getItem(WISHLIST_AWARDED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveAwardedWishlistIds(ids: string[]): void {
  try {
    localStorage.setItem(WISHLIST_AWARDED_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useLoyaltyPoints() {
  const [points, setPoints] = useState<number>(() => loadPoints());

  const awardPoints = useCallback((amount: number) => {
    setPoints((prev) => {
      const next = prev + amount;
      savePoints(next);
      return next;
    });
  }, []);

  const awardWishlistPoints = useCallback((productId: string) => {
    const awarded = loadAwardedWishlistIds();
    if (awarded.includes(productId)) return;
    const next = [...awarded, productId];
    saveAwardedWishlistIds(next);
    awardPoints(5);
  }, [awardPoints]);

  const awardQuizPoints = useCallback(() => {
    const key = 'moonlightQuizCompleted';
    const alreadyAwarded = localStorage.getItem(key);
    if (alreadyAwarded) return;
    localStorage.setItem(key, 'true');
    awardPoints(10);
  }, [awardPoints]);

  const nextTier = REWARD_TIERS.find((t) => t.points > points);
  const currentTier = [...REWARD_TIERS].reverse().find((t) => t.points <= points);
  const pointsToNextTier = nextTier ? nextTier.points - points : 0;

  return {
    points,
    awardPoints,
    awardWishlistPoints,
    awardQuizPoints,
    nextTier,
    currentTier,
    pointsToNextTier,
    rewardTiers: REWARD_TIERS,
  };
}
