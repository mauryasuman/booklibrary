/**
 * Persistent Book Storage
 * Saves books to a JSON file for permanent storage
 * Backup mechanism for database persistence
 */

const fs = require('fs');
const path = require('path');

const persistenceDir = path.join(__dirname, '../data');
const persistenceFile = path.join(persistenceDir, 'books.json');

// Create data directory if it doesn't exist
const ensureDirectoryExists = () => {
  if (!fs.existsSync(persistenceDir)) {
    fs.mkdirSync(persistenceDir, { recursive: true });
    console.log(`📁 Created persistence directory: ${persistenceDir}`);
  }
};

// Read books from JSON file
const loadBooksFromFile = () => {
  try {
    ensureDirectoryExists();
    if (fs.existsSync(persistenceFile)) {
      const data = fs.readFileSync(persistenceFile, 'utf8');
      const books = JSON.parse(data);
      console.log(`✅ Loaded ${books.length} books from persistent storage`);
      return books;
    }
    return [];
  } catch (error) {
    console.error('❌ Error loading books from file:', error.message);
    return [];
  }
};

// Save books to JSON file
const saveBooksToFile = (books) => {
  try {
    ensureDirectoryExists();
    fs.writeFileSync(persistenceFile, JSON.stringify(books, null, 2), 'utf8');
    console.log(`💾 Saved ${books.length} books to persistent storage`);
    return true;
  } catch (error) {
    console.error('❌ Error saving books to file:', error.message);
    return false;
  }
};

// Add or update a book in the file
const persistBook = (book) => {
  try {
    const books = loadBooksFromFile();
    const existingIndex = books.findIndex(b => b._id === book._id);
    
    if (existingIndex >= 0) {
      books[existingIndex] = book;
    } else {
      books.push(book);
    }
    
    saveBooksToFile(books);
    return true;
  } catch (error) {
    console.error('❌ Error persisting book:', error.message);
    return false;
  }
};

// Delete a book from the file
const deletePersistedBook = (bookId) => {
  try {
    let books = loadBooksFromFile();
    books = books.filter(b => b._id !== bookId);
    saveBooksToFile(books);
    return true;
  } catch (error) {
    console.error('❌ Error deleting persisted book:', error.message);
    return false;
  }
};

module.exports = {
  loadBooksFromFile,
  saveBooksToFile,
  persistBook,
  deletePersistedBook,
  getPersistenceFile: () => persistenceFile,
};
