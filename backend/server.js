/**
 * Main Server File
 * Express server setup and routes configuration
 */

require ('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const Book = require('./models/Book');
const { saveBooksToFile } = require('./persistence/bookPersistence');

const app = express();
const port = process.env.PORT || 5000;

// Middleware

// CORS middleware - allows requests from frontend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

// Body parser middleware - parses JSON request bodies
app.use(express.json());

// URL encoded middleware - parses URL encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bookstore API is running',
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Book routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Error handling middleware for 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// Auto-seed books if database is empty
const seedBooksIfEmpty = async () => {
  try {
    if (!mongoose.connection.readyState || mongoose.connection.host === 'dummy') {
      console.warn('⚠️ Skipping seeding: No active database connection');
      return;
    }
    const bookCount = await Book.countDocuments();
    
    if (bookCount === 0) {
      // First try to restore from persistence file to avoid overwriting user data
      const { loadBooksFromFile } = require('./persistence/bookPersistence');
      const savedBooks = loadBooksFromFile();
      
      if (savedBooks && savedBooks.length > 0) {
        await Book.insertMany(savedBooks);
        console.log(`♻️ Restored ${savedBooks.length} books from local persistence`);
        return;
      }

      if (process.env.SEED_BOOKS === 'true') {
        const path = require('path');
        const fs = require('fs');
        const seedDataPath = path.join(__dirname, 'data', 'seedData.json');
        
        if (fs.existsSync(seedDataPath)) {
          const dummyBooks = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));
          await Book.insertMany(dummyBooks);
          console.log(`✅ Seeded ${dummyBooks.length} initial books`);
          
          // Also persist seeded books to file for permanent storage
          saveBooksToFile(dummyBooks);
        } else {
          console.warn('⚠️ seedData.json not found. Skipping seeding.');
        }
      }
    } else {
      // Database already has books, no action needed
    }
  } catch (error) {
    console.error('❌ Error seeding books:', error);
  }
};

const start = async () => {
  try {
    await connectDB();
    
    // Seed books if empty
    try {
      await seedBooksIfEmpty();
    } catch (seedError) {
      console.error('⚠️ Seeding failed but continuing...', seedError.message);
    }
    
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

start();
