const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const analyticsRoutes = require('./routes/analytics');
const forecastRoute = require('./routes/forecast')
const userRoutes = require('./routes/users');     
const groupRoutes = require('./routes/groups');   // ✅ NEW
const productRoutes = require('./routes/products');
const path = require('path');


const app = express();
const PORT = process.env.PORT||5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB().then(() => {
  console.log("MongoDB connected");
  cleanUserUIDs();
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Clean UIDs
async function cleanUserUIDs() {
  const users = await User.find();
  for (let user of users) {
    const trimmed = user.uid.trim();
    if (trimmed !== user.uid) {
      console.log(`Fixing UID "${user.uid}" → "${trimmed}"`);
      user.uid = trimmed;
      await user.save();
    }
  }
}

// Health check
app.get('/', (req, res) => {
  res.send('Backend is up and running');
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// User routes
app.post("/api/users", async (req, res) => {
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
app.use('/images', express.static(path.join(__dirname, 'images')));

// Payments
app.post("/api/users/:uid/payments", async (req, res) => {
  const { uid } = req.params;
  const { amount, method, category, timestamp } = req.body;

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.payments.push({ amount, method, category, timestamp });
    await user.save();

    res.status(200).json({ message: "Payment added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add payment" });
  }
});

app.use('/api', forecastRoute);
app.use('/api', analyticsRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);          // e.g., /api/users/:uid/friends
app.use('/api/groups', groupRoutes);        // e.g., /api/groups/:groupId/members



app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

