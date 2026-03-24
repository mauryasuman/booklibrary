/**
 * Book Controller
 * Handles all book-related API requests: fetching, creating, updating, deleting.
 * Includes persistent file storage for permanent data retention
 */

const Book = require('../models/Book');
const { persistBook, deletePersistedBook, saveBooksToFile } = require('../persistence/bookPersistence');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    try {
        let books = await Book.find().sort({ createdAt: -1 });

        // If database is empty, try to restore from persistent file
        if (books.length === 0) {
            const { loadBooksFromFile } = require('../persistence/bookPersistence');
            const savedBooks = loadBooksFromFile();
            if (savedBooks.length > 0) {
                console.log(`♻️  Restoring ${savedBooks.length} books from persistent storage...`);
                // Restore books to database
                await Book.deleteMany({});
                books = await Book.insertMany(savedBooks);
                console.log(`✅ Successfully restored books from persistent storage`);
            }
        }

        res.status(200).json({
            success: true,
            count: books.length,
            books,
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not fetch books',
        });
    }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.status(200).json({
            success: true,
            book,
        });
    } catch (error) {
        console.error(`Error fetching book ${req.params.id}:`, error);

        // Check if error is due to invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Could not fetch book details',
        });
    }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        await book.deleteOne();
        
        // Remove from persistent storage
        deletePersistedBook(book._id);

        res.status(200).json({
            success: true,
            message: 'Book removed',
        });
    } catch (error) {
        console.error(`Error deleting book ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not delete book',
        });
    }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
    try {
        const bookData = {
            ...req.body,
            createdBy: req.user?._id || null, // Use null if no user (for seeding)
        };
        
        const book = await Book.create(bookData);
        
        // Persist to file for permanent storage
        persistBook(book.toObject());

        res.status(201).json({
            success: true,
            book,
        });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Invalid data',
        });
    }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        
        // Persist to file for permanent storage
        persistBook(book.toObject());

        res.status(200).json({
            success: true,
            book,
        });
    } catch (error) {
        console.error(`Error updating book ${req.params.id}:`, error);
        res.status(400).json({
            success: false,
            message: error.message || 'Invalid data',
        });
    }
};

module.exports = {
    getBooks,
    getBookById,
    deleteBook,
    createBook,
    updateBook,
};
