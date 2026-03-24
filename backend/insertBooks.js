/**
 * SIMPLE: Direct book insertion into running backend's MongoDB
 * Works with both in-memory and local MongoDB
 */

const mongoose = require('mongoose');
const sampleBooks = require('../SAMPLE_BOOKS.json');

// Use the same database URI as backend
require('dotenv').config();

// Create schemas inline
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    pages: { type: Number, required: true },
    publishedYear: { type: Number, required: true },
    coverImage: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stockQuantity: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);

async function insertBooks() {
  try {
    // Connect to same database as running backend
    console.log('\n⏳ Connecting to MongoDB...\n');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';
    
    // Add connection options to handle both local and remote
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: false
    });

    console.log('✅ Connected to MongoDB\n');

    // Find or create admin user
    console.log('🔍 Finding or creating admin user...');
    let admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      // Create a default admin user
      const bcryptjs = require('bcryptjs');
      const hashedPassword = await bcryptjs.hash('admin123', 10);
      
      admin = new User({
        name: 'Admin',
        email: 'admin@bookstore.com',
        password: hashedPassword,
        role: 'admin',
      });
      
      await admin.save();
      console.log('✅ Created admin user\n');
    } else {
      console.log('✅ Found admin user\n');
    }

    // Check for existing books
    const existingCount = await Book.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing books.\n`);
      console.log('📚 Books are already in the database.\n');
      console.log('✨ Visit http://localhost:3000 to view them!\n');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Insert all books
    console.log(`📖 Inserting ${sampleBooks.length} sample books...\n`);

    const booksWithAdmin = sampleBooks.map(book => ({
      ...book,
      createdBy: admin._id,
    }));

    const inserted = await Book.insertMany(booksWithAdmin);

    console.log(`✅ SUCCESS! Inserted ${inserted.length} books:\n`);
    inserted.forEach((book, i) => {
      console.log(`   ${i + 1}. ${book.title} - ${book.author} ($${book.price})`);
    });

    console.log('\n✨ Books are now in your database!');
    console.log('🌐 Visit http://localhost:3000 to see them displayed!\n');

    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    // More helpful error messages
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\nMake sure MongoDB is running!');
      console.error('Start it with: mongod\n');
    } else if (error.message.includes('E11000')) {
      console.error('\nOne of the books already exists in the database.');
      console.error('Each book needs a unique ISBN.\n');
    }

    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run it
insertBooks();
