'use client'
import React, { useState } from "react";
import Rating from "./Rating";

const DemoRating = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">⭐ Rate This Page</h1>
      <Rating onRate={setRating} />
      <p className="mt-4 text-lg">You rated: {rating} / 5</p>
    </div>
  );
};

export default DemoRating;
