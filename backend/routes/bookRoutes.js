const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBookById,
    deleteBook,
    createBook,
    updateBook,
} = require('../controllers/bookController');

// Import middleware for auth if needed later, currently public for viewing
// const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getBooks)
    .post(createBook); // Add auth middleware here later

router.route('/:id')
    .get(getBookById)
    .put(updateBook)    // Add auth middleware here later
    .delete(deleteBook); // Add auth middleware here later

module.exports = router;
