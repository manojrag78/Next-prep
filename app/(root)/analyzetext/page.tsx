"use client";

import React, { useState } from "react";
import LetterCounter from "./_compoents/LetterCounter";
import LetterDensity from "./_compoents/LetterDensity";


const SearchTextArea = () => {
  const [enteredText, setEnteredText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredText(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Analyze Your Text In Real Time
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Get instant insights on characters, word usage, and more!
        </p>
      </div>

      {/* Input */}
      <div className="max-w-4xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Type or paste your text here..."
          className="w-full h-24 px-6 py-4 text-lg rounded-xl bg-gray-800 border border-gray-700 shadow-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={enteredText}
          onChange={handleTextChange}
          autoFocus
        />
      </div>

      {/* Letter Stats */}
      <div className="max-w-6xl mx-auto">
        <LetterCounter sentence={enteredText} />
      </div>

      {/* Density Analysis */}
      <div className="max-w-6xl mx-auto mt-8">
        <LetterDensity text={enteredText} />
      </div>
    </div>
  );
};

export default SearchTextArea;
