import React from "react";
import { useCalculateSentenceDetails } from "../../../hooks/useCalculateSentenceDetails";

interface SentenceDetail {
  sentence: string;
}

const LetterCounter = ({ sentence }: SentenceDetail) => {
  const { totalCharacters, wordsCount, sentencesCount } =
    useCalculateSentenceDetails(sentence);

  const details = [
    {
      id: 1,
      title: "Total Characters",
      count: totalCharacters,
      bg: "bg-purple-400",
      pattern: "bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:16px_16px]",
    },
    {
      id: 2,
      title: "Word Count",
      count: wordsCount,
      bg: "bg-orange-500",
      pattern: "bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:16px_16px]",
    },
    {
      id: 3,
      title: "Sentence Count",
      count: sentencesCount,
      bg: "bg-rose-300",
      pattern: "bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:16px_16px]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {details.map((detail) => (
        <div
          key={detail.id}
          className={`rounded-xl p-6 text-white shadow-lg flex flex-col justify-between ${detail.bg} ${detail.pattern} h-40`}
        >
          <h2 className="text-5xl font-bold">{detail.count}</h2>
          <p className="text-lg font-semibold mt-auto">{detail.title}</p>
        </div>
      ))}
    </div>
  );
};

export default LetterCounter;
