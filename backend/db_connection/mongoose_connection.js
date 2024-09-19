import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database is connected successfully');
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
};


export default connectToDatabase;