const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
// After connectDB
connectDB().then(() => {
  console.log("User model file:", require.resolve('./models/User'));
  cleanUserUIDs(); // trim any accidental spaces
});

// Async cleaner function
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

// Routes
app.get('/', (req, res) => {
  res.send('Backend is up and running');
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

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

// 🔹 Add new payment for user
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

// Use external analytics route
app.use('/api', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
