"use client";

import React, { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60; // ✅ Corrected
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const TimerPage = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-md rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-bold mb-6">⏱ Stopwatch</h1>
        <div className="text-5xl font-mono mb-6">{formatTime(time)}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartStop}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
