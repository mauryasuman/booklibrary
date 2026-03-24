#!/usr/bin/env node

/**
 * Quick test to verify database connectivity
 */

require('dotenv').config();
const mongoose = require('mongoose');

async function testDB() {
  try {
    console.log('🧪 Testing database connection...');
    
    const uri = process.env.MONGODB_URI;
    
    if (uri) {
      console.log('📡 Trying to connect to provided MongoDB URI...');
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ Connected to MongoDB!');
    } else {
      console.log('⚠️  No MONGODB_URI provided, trying in-memory...');
      
      const { MongoMemoryServer } = require('mongodb-memory-server');
      console.log('🚀 Starting MongoMemoryServer...');
      
      const mongod = await MongoMemoryServer.create({
        instance: {
          port: 27017,
        },
      });
      
      const memUri = mongod.getUri();
      console.log(`✅ MongoMemoryServer started at: ${memUri}`);
      
      await mongoose.connect(memUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Connected to in-memory MongoDB!');
      
      // Cleanup
      await mongoose.disconnect();
      await mongod.stop();
      console.log('✅ Cleanup complete');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testDB();
