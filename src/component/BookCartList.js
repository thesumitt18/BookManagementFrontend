import React from 'react';
import BookCart from './BookCart';

function BookCartList({ books,handleFetchBooks }) {
  if (!Array.isArray(books) || books.length === 0) {
    return <div>No books available</div>;
  }

  return (
    <div className="book-card-list">
      {books.map((book) => (
        <BookCart key={book.id} book={book} handleFetchBooks={handleFetchBooks} /> // Make sure handleFetchBooks is passed here
      ))}
    </div>
  );
}

export default BookCartList;
