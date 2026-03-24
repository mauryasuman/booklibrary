/**
 * Edit Book Page Component
 * Form to update existing book (Admin only)
 * 
 * This component:
 * - Loads book data from MongoDB
 * - Allows admins to update book information
 * - Uses consistent "image" field for all book data
 * - Provides image preview
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/api';
import '../styles/BookForm.css';

// Sample book cover image URLs (direct, valid URLs)
const SAMPLE_IMAGES = {
  fiction: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
  nonfiction: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
  science: 'https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&q=80&w=800',
  history: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
  biography: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
  children: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800',
};

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch book function
  const fetchBook = async () => {
    const response = await getBookById(id);

    if (response.success) {
      setFormData(response.book);
      setImagePreview(response.book.imageURL || response.book.image); // Fallback for old data
      setError('');
    } else {
      setError(response.message || 'Failed to load book');
    }

    setLoading(false);
  };

  // Fetch book details on mount
  useEffect(() => {
    fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const newData = {
      ...formData,
      [name]: name === 'pages' || name === 'price' || name === 'publishedYear' || name === 'stockQuantity'
        ? parseInt(value) || ''
        : value,
    };

    // Update image preview if image URL changes
    if (name === 'imageURL') {
      setImagePreview(value || formData.imageURL);
    }

    // Auto-select appropriate image when category changes
    if (name === 'category') {
      const categoryLower = value.toLowerCase();
      if (SAMPLE_IMAGES[categoryLower]) {
        newData.imageURL = SAMPLE_IMAGES[categoryLower];
        setImagePreview(SAMPLE_IMAGES[categoryLower]);
      }
    }

    setFormData(newData);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Validate required fields
    if (
      !formData.title ||
      !formData.author ||
      !formData.description ||
      !formData.price ||
      !formData.isbn ||
      !formData.pages ||
      !formData.publishedYear ||
      (!formData.imageURL && !formData.image)
    ) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    // Validate image URL format
    const imgUrl = formData.imageURL || formData.image;
    if (!/^https?:\/\/.+/.test(imgUrl)) {
      setError('Please provide a valid image URL (must start with http:// or https://)');
      setSubmitting(false);
      return;
    }

    // Validate price is positive
    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      setSubmitting(false);
      return;
    }

    // Validate pages is positive
    if (formData.pages <= 0) {
      setError('Number of pages must be greater than 0');
      setSubmitting(false);
      return;
    }

    try {
      // Call update book API
      const response = await updateBook(id, formData);

      if (response.success) {
        alert('✅ Book updated successfully!');
        navigate('/');
      } else {
        setError(response.message || 'Failed to update book');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Update book error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="book-form-page">
        <p className="loading">⏳ Loading book...</p>
      </div>
    );
  }

  // Error state
  if (error && !formData) {
    return (
      <div className="book-form-page">
        <div className="error-message">❌ {error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  // Not found state
  if (!formData) {
    return (
      <div className="book-form-page">
        <p>📭 Book not found</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="book-form-page">
      <div className="form-container">
        <h2>📖 Edit Book</h2>
        <p className="form-description">Update the book details below. All fields marked with * are required.</p>

        {/* Error Message */}
        {error && <div className="error-message">❌ {error}</div>}

        {/* Image Preview */}
        <div className="image-preview-section">
          <h3>Book Cover Preview</h3>
          <img
            src={imagePreview}
            alt="Book cover preview"
            className="image-preview"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="book-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Book Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., The Great Gatsby"
              required
            />
          </div>

          {/* Author */}
          <div className="form-group">
            <label htmlFor="author">Author Name *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g., F. Scott Fitzgerald"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what the book is about (minimum 20 characters)"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 299.99"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
              <option value="Children">Children</option>
              <option value="Other">Other</option>
            </select>
            <small>Selecting a category will auto-fill a sample image</small>
          </div>

          {/* ISBN */}
          <div className="form-group">
            <label htmlFor="isbn">ISBN *</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="e.g., 9780743273565"
              required
            />
            <small>Must be unique</small>
          </div>

          {/* Pages */}
          <div className="form-group">
            <label htmlFor="pages">Number of Pages *</label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              placeholder="e.g., 280"
              min="1"
              required
            />
          </div>

          {/* Published Year */}
          <div className="form-group">
            <label htmlFor="publishedYear">Published Year *</label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder={new Date().getFullYear().toString()}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="imageURL">Book Image URL *</label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL || formData.image}
              onChange={handleChange}
              placeholder="e.g., https://example.com/image.jpg"
              required
            />
            <small>Must be a valid direct image URL (http:// or https://)</small>
            <details className="sample-urls">
              <summary>📖 Sample image URLs you can use:</summary>
              <ul>
                <li><strong>Fiction:</strong> {SAMPLE_IMAGES.fiction}</li>
                <li><strong>Non-Fiction:</strong> {SAMPLE_IMAGES.nonfiction}</li>
                <li><strong>Science:</strong> {SAMPLE_IMAGES.science}</li>
                <li><strong>History:</strong> {SAMPLE_IMAGES.history}</li>
                <li><strong>Biography:</strong> {SAMPLE_IMAGES.biography}</li>
              </ul>
            </details>
          </div>

          {/* Stock Quantity */}
          <div className="form-group">
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="e.g., 25"
              min="0"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary form-submit" disabled={submitting}>
            {submitting ? '⏳ Updating Book...' : '💾 Update Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
