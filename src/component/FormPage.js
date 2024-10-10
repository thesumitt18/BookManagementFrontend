import React, { useState } from 'react';
import axios from 'axios';

function FormPage({ handlefetch }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);

    try {
      const response = await axios.post("http://localhost:7001/book/create", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data); 
      handlefetch();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Book Directory</h1>
      <form onSubmit={handleSubmit} className="book-form">
        <label>Title</label>
        <input
          type='text'
          placeholder='Enter book title'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          placeholder='Enter book description'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
        <label>File</label>
        <input
          type='file'
          name='file'
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
