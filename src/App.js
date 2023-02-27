import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);

  const handleCreate = (title) => {
    let generateID = Math.round(Math.random() * 9999);

    const updateBooks = [...books, { id: generateID, title }];

    setBooks(updateBooks);
  };

  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBooksById = (id, newTitle) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          title: newTitle,
        };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList
        books={books}
        onDelete={deleteBookById}
        onEdit={editBooksById}
      />
      <BookCreate onCreate={handleCreate} />
    </div>
  );
};

export default App;
