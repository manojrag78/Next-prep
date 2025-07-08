"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Question {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  options: string[];
  selected?: string;
  explanation?: string;
}

export default function PlayQuiz() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const count = parseInt(searchParams.get("count") || "5");
  const totalTime = count * 30;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(totalTime);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/api/questions?categories=technology&limit=${count}`
    )
      .then((res) => res.json())
      .then((data) => {
        type ApiQuestion = {
          question: string;
          correctAnswer: string;
          incorrectAnswers: string[];
        };
        const formatted = data.map((q: ApiQuestion) => ({
          question: q.question,
          correctAnswer: q.correctAnswer,
          incorrectAnswers: q.incorrectAnswers,
          options: [...q.incorrectAnswers, q.correctAnswer].sort(() => Math.random() - 0.5),
        }));
        setQuestions(formatted);
      });
  }, [count]);

  useEffect(() => {
    if (timer > 0 && !showResult) {
      const id = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(id);
    } else if (timer === 0) {
      setShowResult(true);
    }
  }, [timer, showResult]);

  const handleSelect = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    const isCorrect = answer === questions[currentIndex].correctAnswer;
    if (isCorrect) setScore((s) => s + 1);
    questions[currentIndex].selected = answer;
    questions[currentIndex].explanation = "This is a common programming fact.";
    setQuestions([...questions]);
  };

  const next = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelected(null);
    }
  };

  if (!questions.length) return <div className="p-6">Loading...</div>;

  if (showResult)
    return (
      <div className="min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-4">🎉 Quiz Completed!</h2>
        <p className="mb-4">Score: {score} / {questions.length}</p>
        {questions.map((q, idx) => (
          <div key={idx} className="p-4 border rounded mb-4">
            <h3 className="font-semibold">{idx + 1}. {q.question}</h3>
            <p>Your Answer: <span className={q.selected === q.correctAnswer ? "text-green-600" : "text-red-600"}>{q.selected}</span></p>
            <p>Correct Answer: <span className="text-green-700">{q.correctAnswer}</span></p>
            <p className="text-sm text-gray-500 mt-1 italic">Explanation: {q.explanation}</p>
          </div>
        ))}
        <button
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 cursor-pointer"
          onClick={() => router.push("/quiz/setup")}
        >
          Retake Quiz
        </button>
      </div>
    );

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-xl w-full space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span>Time left: {timer}s</span>
        </div>
        <h3 className="text-lg font-semibold">{current.question}</h3>
        <div className="space-y-2">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`w-full p-2 border rounded  cursor-pointer ${
                selected
                  ? opt === current.correctAnswer
                    ? "bg-green-200 border-green-600"
                    : opt === selected
                    ? "bg-red-200 border-red-600"
                    : "bg-gray-100"
                  : "hover:bg-indigo-100"
              }`}
              disabled={!!selected}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="flex justify-between pt-4">
          <button onClick={prev} disabled={currentIndex === 0} className="text-indigo-500 cursor-pointer">Previous</button>
          <button onClick={next} className="text-indigo-700 font-semibold cursor-pointer">
            {currentIndex + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}