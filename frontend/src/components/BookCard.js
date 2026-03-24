/**
 * Book Card Component
 * Displays a single book with basic info and action buttons
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/BookCard.css';


const BookCard = ({ book, onDelete, isAdmin }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating if this somehow gets wrapped in a link
    addToCart(book);
    alert('Book added to cart!');
  };

  return (
    <div className="book-card">
      {/* Book Cover Image */}
      <div className="book-image">
        <img src={book.imageURL || book.image} alt={book.title} />
      </div>

      {/* Book Info */}
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-category">{book.category}</p>
        <p className="book-price">₹ {book.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="book-actions">
        {/* View Details Button */}
        <Link to={`/book/${book._id}`} className="btn btn-primary">
          View Details
        </Link>
        
        {/* Add to Cart Button */}
        <button 
          className="btn btn-success" 
          onClick={handleAddToCart}
          disabled={book.stockQuantity === 0}
        >
          {book.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* Edit Button - Only for Admin */}
        {isAdmin && (
          <Link to={`/edit-book/${book._id}`} className="btn btn-warning">
            Edit
          </Link>
        )}

        {/* Delete Button - Only for Admin */}
        {isAdmin && (
          <button className="btn btn-danger" onClick={() => onDelete(book._id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
