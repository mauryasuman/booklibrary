import React, { useState, useEffect } from 'react';
import { getAllBooks, deleteBook } from '../services/api';
import BookCard from '../components/BookCard';
import Carousel from '../components/Carousel';
import '../styles/HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books function
  const fetchBooks = async () => {
    setLoading(true);
    const response = await getAllBooks();

    if (response.success) {
      setBooks(response.books);
      setError('');
    } else {
      setError(response.message || 'Failed to load books');
      setBooks([]);
    }

    setLoading(false);
  };

  // Handle delete book
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    const response = await deleteBook(bookId);

    if (response.success) {
      setBooks(books.filter((book) => book._id !== bookId));
      alert('Book deleted successfully');
    } else {
      alert(response.message || 'Failed to delete book');
    }
  };

  return (
    <div className="home-page">
      {/* Carousel Banner */}
      <Carousel />

      {/* Page Header */}
      <div className="home-header">
        <h1>📚 Our Collection</h1>
        <p>Discover and explore our amazing collection of books</p>
        <button onClick={fetchBooks} className="btn btn-secondary" style={{ marginTop: '10px' }}>
          🔄 Refresh Books
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          ❌ {error}
          <button onClick={fetchBooks} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <p>⏳ Loading books...</p>
        </div>
      )}

      {/* Books Grid */}
      {!loading && (
        <>
          {books.length > 0 ? (
            <div className="books-grid">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={handleDeleteBook}
                  isAdmin={user.role === 'admin'}
                />
              ))}
            </div>
          ) : (
            <div className="no-books">
              <p>📭 No books found. Please add some books!</p>
              <button onClick={fetchBooks} className="btn btn-primary">
                🔄 Try Refreshing
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
