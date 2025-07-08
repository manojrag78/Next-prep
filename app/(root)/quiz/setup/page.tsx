"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SetupPage() {
  const router = useRouter();
  const [count, setCount] = useState(5);

  const start = () => {
    router.push(`/quiz/play?count=${count}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full space-y-4">
        <h2 className="text-xl font-semibold text-center">Configure Quiz</h2>
        <label>Number of Questions:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={start}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
