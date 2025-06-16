const mongoose = require('mongoose');

// ✅ Replace with your actual MongoDB URI
const uri = 'mongodb+srv://wanderlog74:7rZNDZy0eRogTDpS@amazon-hackon.3ju4gsr.mongodb.net/userDB?retryWrites=true&w=majority&appName=amazon-hackon';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
