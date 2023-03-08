import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

const BookEdit = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book.title);
  const { editBooksById } = useBooksContext();

  const handleSaveSubmit = (event) => {
    event.preventDefault();

    onSubmit();

    editBooksById(book.id, title);
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={handleSaveSubmit}>
      <label>Title</label>
      <input
        autoFocus
        className="input"
        value={title}
        onChange={handleInputChange}
      />
      <button className="button is-primary" onSubmit={handleSaveSubmit}>
        Save
      </button>
    </form>
  );
};

export default BookEdit;
