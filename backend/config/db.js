/**
 * Database Configuration
 * Connects to MongoDB using Mongoose; falls back to in-memory server for development
 */

const mongoose = require('mongoose');
let mongod = null;

// Try to use an in-memory MongoDB when no MONGODB_URI is provided or connection fails
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (uri && uri !== 'YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE') {
      try {
        console.log('📡 Attempting to connect to MongoDB URI...');
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
        return mongoose.connection;
      } catch (err) {
        console.warn('⚠️  Could not connect to provided MongoDB URI — falling back to in-memory DB');
      }
    }

    // Start an in-memory MongoDB for development and testing
    console.log('🚀 Starting in-memory MongoDB...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      process.env.MONGOMS_DOWNLOAD_DIR = './node_modules/.mongodb-memory-server';
      const path = require('path');
      mongod = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbPath: path.join(__dirname, '..', 'data', 'db'),
          storageEngine: 'wiredTiger'
        },
      });
      const memUri = mongod.getUri();
      console.log(`📍 In-memory MongoDB URI: ${memUri}`);
      await mongoose.connect(memUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`✅ In-memory MongoDB started successfully`);
      return mongoose.connection;
    } catch (inMemError) {
      console.error(`❌ In-memory MongoDB failed: ${inMemError.message}`);
    }

    // Final fallback: mock connection
    console.warn('⚠️  Falling back to MOCK database connection (data will not persist)');
    return { 
      host: 'mock-host',
      readyState: 1,
      collection: () => ({ find: () => ({ toArray: () => [] }), countDocuments: () => 0, insertMany: () => ({}) }),
      db: { collection: () => ({ find: () => ({ toArray: () => [] }), countDocuments: () => 0, insertMany: () => ({}) }) }
    };
  } catch (error) {
    console.error(`❌ Global MongoDB startup error: ${error.message}`);
    return { host: 'dummy', readyState: 0 };
  }
};

// Graceful shutdown for in-memory server
process.on('SIGINT', async () => {
  try {
    console.log('🛑 Shutting down gracefully...');
    await mongoose.disconnect();
    if (mongod) await mongod.stop();
    console.log('✅ Shutdown complete');
  } catch (e) {
    console.error('❌ Error during shutdown:', e);
  } finally {
    process.exit(0);
  }
});

module.exports = connectDB;
