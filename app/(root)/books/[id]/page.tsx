import { getBookById } from '@/app/lib/books';
import { ArrowLeftIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

// Optional: Dynamic metadata for SEO
export async function generateMetadata({ params }: BookDetailPageProps): Promise<Metadata> {
  const book = await getBookById(params.id);

  return {
    title: book?.volumeInfo?.title || 'Book Detail',
    description: book?.volumeInfo?.description?.slice(0, 150),
  };
}

export default async function BookDetail({ params }: BookDetailPageProps) {
  const book = await getBookById(params.id);

  if (!book) {
    notFound(); // Proper 404
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/books" className="flex items-center text-indigo-600 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to search
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 p-6 flex items-center justify-center bg-indigo-50">
              {book.volumeInfo?.imageLinks?.thumbnail ? (
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')}
                  alt={book.volumeInfo.title}
                  width={300}
                  height={450}
                  className="max-h-96 object-contain"
                  unoptimized
                />
              ) : (
                <div className="text-center text-indigo-300">
                  <BookOpenIcon className="h-32 w-32 mx-auto" />
                  <p>No cover available</p>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-indigo-900 mb-2">
                {book.volumeInfo?.title}
              </h1>

              {book.volumeInfo?.authors && (
                <p className="text-lg text-indigo-600 mb-4">
                  by {book.volumeInfo.authors.join(', ')}
                </p>
              )}

              {/* Rating */}
              {book.volumeInfo?.averageRating && (
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(book.volumeInfo.averageRating!)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 ml-2">
                    ({book.volumeInfo.ratingsCount || 0} ratings)
                  </span>
                </div>
              )}

              {/* Preview Button */}
              {book.volumeInfo?.previewLink && (
                <a
                  href={book.volumeInfo.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <BookOpenIcon className="inline h-5 w-5 mr-2" />
                  Read Preview
                </a>
              )}

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {book.volumeInfo?.publishedDate && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Published</h4>
                    <p>{new Date(book.volumeInfo.publishedDate).getFullYear()}</p>
                  </div>
                )}
                {book.volumeInfo?.pageCount && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Pages</h4>
                    <p>{book.volumeInfo.pageCount}</p>
                  </div>
                )}
                {book.volumeInfo?.categories && (
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">Categories</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {book.volumeInfo.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {book.volumeInfo?.description && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">Description</h3>
                  <p>{book.volumeInfo.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
