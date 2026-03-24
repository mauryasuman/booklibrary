/**
 * resync.js
 * 
 * Usage: node resync.js
 * 
 * Syncs database books to backend/data/books.json AND vice-versa.
 * To be used if you suspect data is out of sync.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const { saveBooksToFile, loadBooksFromFile } = require('./persistence/bookPersistence');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Connection error:', error.message);
        process.exit(1);
    }
};

const sync = async () => {
    await connectDB();

    try {
        const count = await Book.countDocuments();
        const fileBooks = loadBooksFromFile();

        console.log(`📊 Database has ${count} books.`);
        console.log(`📊 Backup file has ${fileBooks.length} books.`);

        if (count > 0) {
            console.log('🔄 Syncing Database -> Backup File...');
            const dbBooks = await Book.find().lean();
            saveBooksToFile(dbBooks);
            console.log('✅ Backup File updated with Database content.');
        } else if (fileBooks.length > 0) {
            console.log('🔄 Syncing Backup File -> Database...');
            await Book.insertMany(fileBooks);
            console.log('✅ Database restored from Backup File.');
        } else {
            console.log('⚠️ Both Database and Backup File are empty.');
        }

        process.exit();
    } catch (error) {
        console.error('❌ Sync error:', error.message);
        process.exit(1);
    }
};

sync();
