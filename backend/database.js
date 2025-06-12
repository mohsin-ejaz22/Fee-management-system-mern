import mongoose from 'mongoose';

// const url = 'mongodb://127.0.0.1:27017/proo';

const dbUrl = process.env.dbAtlasUrl;

async function connectToDatabase() {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}





export default connectToDatabase;