import mongoose from 'mongoose';

export async function mongooseConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    }

    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quick';
    return await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}