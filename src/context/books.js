import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axios.get(
      'https://readinglist-portfolio.netlify.app/books'
    );

    setBooks(response.data);
  }, []);

  const createBook = async (title) => {
    const response = await axios.post(
      'https://readinglist-portfolio.netlify.app//books',
      {
        title,
      }
    );

    const updateBooks = [...books, response.data];

    setBooks(updateBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`https://readinglist-portfolio.netlify.app/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBooksById = async (id, newTitle) => {
    const response = await axios.put(
      `https://readinglist-portfolio.netlify.app/${id}`,
      {
        title: newTitle,
      }
    );

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    fetchBooks,
    createBook,
    deleteBookById,
    editBooksById,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
};

export { Provider };
export default BooksContext;
