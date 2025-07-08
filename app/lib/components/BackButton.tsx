"use client";
import Link from 'next/link';

export default function BackButton() {
  return (
    <div className="p-2 bg-white shadow-sm z-10">
      <Link href="/" className="text-indigo-600 hover:text-indigo-800 underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}