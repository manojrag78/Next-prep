'use client';

import { useState } from 'react';

type RatingProps = {
  max?: number; // default: 5
  onRate?: (value: number) => void;
  size?: number; // size of stars (in px)
};

const Rating = ({ max = 5, onRate, size = 32 }: RatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(0);

  const handleClick = (value: number) => {
    setSelected(value);
    if (onRate) onRate(value);
  };

  return (
    <div className="flex gap-2">
      {[...Array(max)].map((_, i) => {
        const value = i + 1;
        const isFilled = hovered ? value <= hovered : value <= selected;

        return (
          <svg
            key={value}
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            xmlns="http://www.w3.org/2000/svg"
            fill={isFilled ? 'gold' : 'none'}
            viewBox="0 0 24 24"
            stroke="gold"
            width={size}
            height={size}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.72 5.303a1 1 0 00.95.69h5.576c.969 0 1.371 1.24.588 1.81l-4.514 3.28a1 1 0 00-.364 1.118l1.72 5.303c.3.921-.755 1.688-1.538 1.118l-4.514-3.28a1 1 0 00-1.176 0l-4.514 3.28c-.783.57-1.838-.197-1.538-1.118l1.72-5.303a1 1 0 00-.364-1.118l-4.514-3.28c-.783-.57-.38-1.81.588-1.81h5.576a1 1 0 00.95-.69l1.72-5.303z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default Rating;
