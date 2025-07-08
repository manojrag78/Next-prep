'use client';
import { useState, useEffect, useCallback } from 'react';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/app/types/books';
import { useDebounce } from '@/app/hooks/useDebounce';
import { fetchBooks } from '@/app/lib/books';


const categories = [
  'Fiction', 'Biography', 'Science', 'History',
  'Fantasy', 'Romance', 'Mystery', 'Business'
];

export default function BookRecommender() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Fiction');
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 12;
const debouncedQuery = useDebounce(searchQuery, 300);

  const loadBooks = useCallback(
    async (query: string, page: number) => {
      setLoading(true);
      const { items, totalItems } = await fetchBooks(
        query || `subject:${selectedCategory}`,
        page * booksPerPage,
        booksPerPage
      );
      setBooks(items);
      setTotalItems(totalItems);
      setLoading(false);
    },
    [selectedCategory, booksPerPage]
  );

  useEffect(() => {
    loadBooks(debouncedQuery, currentPage);
  }, [debouncedQuery, selectedCategory, currentPage,loadBooks]);
 
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
    // loadBooks(searchQuery, 0);
    // setDebouncedQuery(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(0);
  };

  const totalPages = Math.ceil(totalItems / booksPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Book Finder</h1>
          <p className="text-indigo-700">Discover your next favorite read</p>
        </motion.div>

        {/* Search & Filters */}
        <form onSubmit={handleSearch} className="my-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 text-indigo-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or ISBN..."
              className="block w-full pl-10 pr-10 py-3 rounded-lg bg-white border border-indigo-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <XMarkIcon className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(0);
                }}
                className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-700 hover:bg-indigo-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </form>

        {/* Book Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(booksPerPage)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
                >
                  <Link href={`/books/${book.id}`} className="absolute inset-0 z-10" />
                  
                  {/* Book Cover */}
                  <div className="h-48 bg-indigo-50 flex items-center justify-center">
                    {book.volumeInfo?.imageLinks?.thumbnail ? (
                      <Image
                        src={book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')}
                        alt={book.volumeInfo.title}
                        width={128}
                        height={196}
                        className="h-full object-contain"
                        unoptimized // Bypass Next.js image optimization for external URLs
                      />
                    ) : (
                      <BookOpenIcon className="h-16 w-16 text-indigo-300" />
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-indigo-900 line-clamp-2 mb-1">
                      {book.volumeInfo?.title}
                    </h3>
                    {book.volumeInfo?.authors && (
                      <p className="text-sm text-indigo-600 line-clamp-1">
                        {book.volumeInfo.authors.join(', ')}
                      </p>
                    )}

                    {book.volumeInfo?.previewLink && (
                      <a
                        href={book.volumeInfo.previewLink}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded z-20 relative"
                      >
                        Preview Available
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-full bg-white disabled:opacity-50"
                >
                  <ArrowLeftIcon className="h-5 w-5 cursor-pointer" />
                </button>
                
                <span className="flex items-center px-4">
                  Page {currentPage + 1} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage >= totalPages - 1}
                  className="p-2 rounded-full bg-white disabled:opacity-50"
                >
                  <ArrowRightIcon className="h-5 w-5 cursor-pointer" />
                </button>
              </div>
            )}
          </>
        )}

        {!loading && books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-indigo-700">No books found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}