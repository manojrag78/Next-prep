import axios from 'axios';
import { Book, BookApiResponse } from '../types/books';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (
  query: string = 'subject:fiction',
  startIndex: number = 0,
  maxResults: number = 12
): Promise<BookApiResponse> => {
  try {
    const response = await axios.get<BookApiResponse>(BASE_URL, {
      params: {
        q: query,
        startIndex,
        maxResults,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return { items: [], totalItems: 0 };
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const response = await axios.get<Book>(
      `${BASE_URL}/${id}`,
      {
        params: {
          key: API_KEY,
        },
      }
    );
    
    // Ensure the response has the expected structure
    if (response.data && response.data.id) {
      return response.data;
    }
    return null;
    
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};