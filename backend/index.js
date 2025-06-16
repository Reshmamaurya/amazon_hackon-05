// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = 5000;

// // Replace this with your actual MongoDB URI (be sure to encode password if needed)
// const uri = 'mongodb+srv://wanderlog74:7rZNDZy0eRogTDpS@amazon-hackon.3ju4gsr.mongodb.net/userDB?retryWrites=true&w=majority&appName=amazon-hackon';

// // Middleware
// app.use(cors());
// app.use(express.json()); // Required to parse JSON in POST requests

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('✅ Connected to MongoDB Atlas');
//   console.log('🗃️  Connected to DB:', mongoose.connection.name); // Correct placement
// })
// .catch(err => console.error('❌ MongoDB connection error:', err));

// // Test Schema & Model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// // Routes
// app.get('/', (req, res) => {
//   res.send('Backend is up and running');
// });

// app.get('/api/ping', (req, res) => {
//   res.json({ message: 'pong' });
// });


// app.post("/api/users", async (req, res) => {
//   console.log("Received request:", req.body);
//   const { uid, name, email } = req.body;
//   try {
//     const existingUser = await User.findOne({ uid });
//     if (!existingUser) {
//       const newUser = new User({ uid, name, email });
//       await newUser.save();
//       res.status(201).json({ message: "User added" });
//     } else {
//       res.status(200).json({ message: "User already exists" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to store user" });
//   }
// });

// // Example: Get all users
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// ✅ Replace with actual MongoDB URI
const uri = 'mongodb+srv://wanderlog74:7rZNDZy0eRogTDpS@amazon-hackon.3ju4gsr.mongodb.net/userDB?retryWrites=true&w=majority&appName=amazon-hackon';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Fixed Schema with uid
const userSchema = new mongoose.Schema({
  uid: String,
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

app.post("/api/users", async (req, res) => {
  console.log("Received request:", req.body);
  const { uid, name, email } = req.body;

  try {
    const existingUser = await User.findOne({ uid });

    if (!existingUser) {
      const newUser = new User({ uid, name, email });
      await newUser.save();
      res.status(201).json({ message: "User added" });
    } else {
      res.status(200).json({ message: "User already exists" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to store user" });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
