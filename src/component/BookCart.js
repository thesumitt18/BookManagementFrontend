import React, { useState } from 'react';
import axios from 'axios';

function BookCart({ book, handleFetchBooks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: book.title,
    description: book.description,
    file: null, // Add file to editData
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', editData.title);
    formData.append('description', editData.description);
    
    // Only append file if it has been selected
    if (editData.file) {
      formData.append('file', editData.file);
    }

    try {
      await axios.put(`http://localhost:7001/book/update/${book.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
      handleFetchBooks(); // Fetch updated list of books
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async () => {
 
  };

  return (
    <div className="book-card">
      <div className="book-image-section">
        <img src={`http://localhost:7001/${book.file}`} alt={book.title} className="book-image" />
      </div>
      <div className="book-info-section">
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="edit-input"
            />
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="edit-textarea"
            />
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="edit-file-input"
            />
          </>
        ) : (
          <>
            <h2 className="book-title">{book.title}</h2>
            <p className="book-description">{book.description}</p>
          </>
        )}
        <div className="card-buttons">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-btn" onClick={handleEditToggle}>Edit</button>
          )}
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BookCart;
