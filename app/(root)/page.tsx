'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Brain, BookCheck } from 'lucide-react';

const Homepage = () => {
  return (
    <div
      className="min-h-screen text-white px-6 py-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark overlay to make text readable */}
      <div className=" min-h-screen px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to the Learning Hub</h1>
          <p className="text-lg mb-8">
            Explore a variety of resources to enhance your knowledge and skills.
          </p>

          <nav className="space-y-4" aria-label="Primary">
            <Link
              href="/books"
              className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Books</span>
            </Link>

            <Link
              href="/quiz"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              <Brain className="w-5 h-5" />
              <span>Take a Quiz</span>
            </Link>

            <Link
              href="/embed"
              className="flex items-center justify-center gap-3 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded"
            >
              <BookCheck className="w-5 h-5" />
              <span>Learn Data Structures</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
