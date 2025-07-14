// app/page.tsx
"use client";

import Modal from "@/app/components/Model";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Dialog Title</h2>
        <p className="mb-4">This is a modal/dialog content.</p>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
