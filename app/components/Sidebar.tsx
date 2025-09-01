"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu as MenuIcon,
  X as XIcon,
  Home,
  BookOpenCheck,
  LetterText,
  Cloudy,
  BookCheck,
  CircleUserRound,
  MessageCircle,
  Computer,
} from "lucide-react";
import Image from "next/image";
const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Analyze Text", path: "/analyzetext", icon: LetterText },
  { name: "Weather", path: "/weather", icon: Cloudy },
  { name: "Books", path: "/books", icon: BookOpenCheck },
  { name: "Quiz", path: "/quiz", icon: BookOpenCheck },
  { name: "Data Structures", path: "/data-structures", icon: BookCheck },
  { name: "Developer", path: "/knowthedeveloper", icon: CircleUserRound },
  { name: "Chat", path: "/chat", icon: MessageCircle },
  { name: "Machine Coading", path: "/machine-coading", icon: Computer },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isActiveClass = (path: string) =>
    isActive(path)
      ? "bg-indigo-700 text-white"
      : "text-indigo-100 hover:bg-indigo-600 hover:text-white";

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-indigo-700 text-white flex items-center justify-between px-4 h-12 shadow">
        <button onClick={() => setIsOpen(!isOpen)} className="p-1">
          {isOpen ? (
            <XIcon className="w-5 h-5 cursor-pointer" />
          ) : (
            <MenuIcon className="w-5 h-5 cursor-pointer" />
          )}
        </button>
        <h1 className="text-sm font-semibold">Learning Hub</h1>
        <div className="w-5 h-5" />
      </div>

      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-indigo-900 pt-14 p-6 transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <h1 className="hidden md:block text-2xl font-bold text-white mb-6">
          Learning Hub
        </h1>
        <nav className="space-y-2">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              href={path}
              className={`flex items-center gap-3 px-4 py-2 rounded transition duration-200 ${isActiveClass(
                path
              )}`}
              onClick={() => setIsOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer Badge */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className="w-full flex items-center justify-between bg-indigo-800 text-white px-4 py-2 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">
                <Image
                  src="/manoj_myself.jpeg"
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="font-medium">Manoj Kumar</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
