/**
 * Book Details Page Component
 * Shows full details of a single book
 */

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, deleteBook } from '../services/api';
import { CartContext } from '../context/CartContext';
import '../styles/BookDetailsPage.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const { addToCart } = useContext(CartContext);

  // Fetch single book
  const fetchBookDetails = useCallback(async () => {
    setLoading(true);
    const response = await getBookById(id);

    if (response.success) {
      setBook(response.book);
      setError('');
    } else {
      setError(response.message || 'Failed to load book');
    }

    setLoading(false);
  }, [id]);

  // Fetch book details on mount
  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    const response = await deleteBook(id);

    if (response.success) {
      alert('Book deleted successfully');
      navigate('/');
    } else {
      alert(response.message || 'Failed to delete book');
    }
  };

  const handleAddToCart = () => {
    addToCart(book);
    alert('Book added to cart!');
  };

  // Loading state
  if (loading) {
    return (
      <div className="details-page">
        <p className="loading">Loading book details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="details-page">
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  // Book details render
  if (!book) {
    return (
      <div className="details-page">
        <p>Book not found</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <button className="btn-back" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="book-details">
        {/* Book Image */}
        <div className="book-image-large">
          <img src={book.imageURL || book.image} alt={book.title} />
        </div>

        {/* Book Information */}
        <div className="book-information">
          <h1>{book.title}</h1>
          <p className="author">by <strong>{book.author}</strong></p>

          {/* Book Details */}
          <div className="details-info">
            <div className="info-item">
              <span className="label">Category:</span>
              <span className="value">{book.category}</span>
            </div>

            <div className="info-item">
              <span className="label">Price:</span>
              <span className="value price">₹ {book.price}</span>
            </div>

            <div className="info-item">
              <span className="label">ISBN:</span>
              <span className="value">{book.isbn}</span>
            </div>

            <div className="info-item">
              <span className="label">Pages:</span>
              <span className="value">{book.pages}</span>
            </div>

            <div className="info-item">
              <span className="label">Published:</span>
              <span className="value">{book.publishedYear}</span>
            </div>

            <div className="info-item">
              <span className="label">Stock:</span>
              <span className="value">{book.stockQuantity} units</span>
            </div>

            <div className="info-item">
              <span className="label">Added By:</span>
              <span className="value">{book.createdBy?.name || 'Admin'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="description-section">
            <h2>Description</h2>
            <p>{book.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {/* Edit Button - Only for Admin */}
            {user.role === 'admin' && (
              <button
                className="btn btn-warning"
                onClick={() => navigate(`/edit-book/${book._id}`)}
              >
                Edit Book
              </button>
            )}

            {/* Delete Button - Only for Admin */}
            {user.role === 'admin' && (
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Book
              </button>
            )}

            {/* Add to Cart Button */}
            <button 
              className="btn btn-success" 
              onClick={handleAddToCart}
              disabled={book.stockQuantity === 0}
            >
              {book.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
