"use client";

import React from "react";
import { useLetterFrequency } from "../../../hooks/useLetterFrequency";

interface LetterDensityProps {
  text: string;
}

const LetterDensity = ({ text }: LetterDensityProps) => {
  const letterFrequency = useLetterFrequency(text);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Letter Frequency Distribution
      </h2>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {letterFrequency.map(({ letter, count, percentage }) => (
          <div key={letter}>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-gray-300">{letter.toUpperCase()}</span>
              <span className="text-gray-400">
                {count} ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterDensity;
