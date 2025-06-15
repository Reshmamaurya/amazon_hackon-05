const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Replace this with your actual MongoDB URI (be sure to encode password if needed)
const uri = 'mongodb+srv://wanderlog74:7rZNDZy0eRogTDpS@amazon-hackon.3ju4gsr.mongodb.net/userDB?retryWrites=true&w=majority&appName=amazon-hackon';

// Middleware
app.use(cors());
app.use(express.json()); // Required to parse JSON in POST requests

// MongoDB Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Backend is up and running');
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Example: Add a user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: 'User saved', user });
  } catch (err) {
    res.status(500).json({ error: 'Error saving user' });
  }
});

// Example: Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
