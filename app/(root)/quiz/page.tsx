"use client";

import { useRouter } from "next/navigation";

export default function QuizHome() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-6 rounded-xl shadow max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">🚀 Computer Science Quiz</h1>
        <p>Select your quiz preferences to begin.</p>
        <button
          onClick={() => router.push("/quiz/setup")}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 cursor-pointer transition-colors duration-200"
        >
          Start Quiz
        </button>
      </div>
    </main>
  );
}