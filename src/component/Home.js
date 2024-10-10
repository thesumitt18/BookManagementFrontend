import React, { useEffect, useState } from 'react';
import FormPage from './FormPage';
import axios from 'axios';
import BookCartList from './BookCartList';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get('http://localhost:7001/book/findall');
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setBooks([]); // Set to an empty array if data is not as expected
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <>
      <FormPage handlefetch={fetchBook} />
      <BookCartList books={books} handleFetchBooks={fetchBook} />
    </>
  );
}

export default Home;
