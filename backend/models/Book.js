/**
 * Book Model
 * Defines the schema for books in the bookstore
 */

const mongoose = require('mongoose');

// Define book schema
const bookSchema = new mongoose.Schema(
  {
    // Book title (required)
    title: {
      type: String,
      required: [true, 'Please provide a book title'],
      trim: true,
    },
    // Book author (required)
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      trim: true,
    },
    // Book description
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    // Book price
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    // Book category
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Children', 'Other'],
    },
    // Book ISBN
    isbn: {
      type: String,
      required: [true, 'Please provide an ISBN'],
      unique: true,
    },
    // Number of pages
    pages: {
      type: Number,
      required: true,
      min: 1,
    },
    // Publication year
    publishedYear: {
      type: Number,
      required: [true, 'Please provide publication year'],
    },
    // Book cover image URL
    imageURL: {
      type: String,
      required: [true, 'Please provide a book image URL'],
      validate: {
        validator: function(v) {
          // Basic URL validation
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Please provide a valid image URL (must start with http:// or https://)',
      },
    },
    // Admin who created this book (reference to User model)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // Allow null for seeded books
    },
    // Stock quantity
    stockQuantity: {
      type: Number,
      default: 10,
      min: 0,
    },
    // Views details
    views: {
      totalViews: {
        type: Number,
        default: 0,
      },
      todayViews: {
        type: Number,
        default: 0,
      },
      weeklyViews: {
        type: Number,
        default: 0,
      },
      lastViewedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create and export the Book model
module.exports = mongoose.model('Book', bookSchema);
