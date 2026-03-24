const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const runVerification = async () => {
    try {
        console.log('🔍 Starting Backend Verification...');

        // 1. Check Health
        console.log('\n1. Checking Health Endpoint...');
        try {
            const health = await axios.get(`${API_URL}/health`);
            console.log('✅ Health Check Passed:', health.data);
        } catch (e) {
            console.error('❌ Health Check Failed:', e.message);
        }

        // 2. Check Books (should be seeded)
        console.log('\n2. Fetching Books...');
        try {
            const booksRes = await axios.get(`${API_URL}/books`);
            const books = booksRes.data.books;
            console.log(`✅ Fetched ${books.length} books.`);

            if (books.length > 0) {
                const book = books[0];
                console.log('   Sample Book:', {
                    title: book.title,
                    image: book.image, // Verify image field exists
                    price: book.price
                });

                if (book.image && !book.coverImage) {
                    console.log('✅ verification success: book has "image" field and no "coverImage"');
                } else {
                    console.log('⚠️ verification warning: field mismatch');
                }
            } else {
                console.error('❌ No books found! Seeding might have failed.');
            }

        } catch (e) {
            console.error('❌ Fetch Books Failed:', e.message);
        }

    } catch (error) {
        console.error('❌ Verification Script Error:', error);
    }
};

runVerification();
