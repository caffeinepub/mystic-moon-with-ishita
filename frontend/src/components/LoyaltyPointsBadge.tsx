import React from 'react';
import { Star } from 'lucide-react';
import { useLoyaltyPoints } from '../hooks/useLoyaltyPoints';

export default function LoyaltyPointsBadge() {
  const { points, nextTier, pointsToNextTier } = useLoyaltyPoints();

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-default select-none"
      style={{
        background: 'linear-gradient(135deg, oklch(52% 0.12 230 / 0.12), oklch(78% 0.08 30 / 0.12))',
        border: '1px solid oklch(52% 0.12 230 / 0.25)',
        color: 'oklch(40% 0.12 230)',
      }}
      title={
        nextTier
          ? `${pointsToNextTier} more points until ${nextTier.label}`
          : 'Maximum reward tier reached!'
      }
    >
      <Star size={11} className="fill-current flex-shrink-0" style={{ color: 'oklch(72% 0.18 55)' }} />
      <span className="font-display font-semibold" style={{ color: 'oklch(40% 0.12 230)' }}>
        {points}
      </span>
      <span className="hidden sm:inline" style={{ color: 'oklch(52% 0.12 230 / 0.8)' }}>
        pts
      </span>
    </div>
  );
}
