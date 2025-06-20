const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

// ✅ Send Friend Request
router.post('/friend-request', async (req, res) => {
  const { fromEmail, toEmail } = req.body;

  try {
    const fromUser = await User.findOne({ email: fromEmail });
    const toUser = await User.findOne({ email: toEmail });

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add a friend request notification
    toUser.notifications.push({
      message: `${fromUser.name} sent you a friend request`,
      type: 'friend-request',
    });

    await toUser.save();
    res.json({ message: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Accept Friend Request
router.post('/accept-friend', async (req, res) => {
  const { userEmail, friendEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    const friend = await User.findOne({ email: friendEmail });

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only add if not already friends
    if (!user.friends.includes(friend._id)) user.friends.push(friend._id);
    if (!friend.friends.includes(user._id)) friend.friends.push(user._id);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Friends List by Email
router.get('/:email/friends', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.friends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// Get notifications for a user
router.get('/:email/notifications', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.notifications || []);
  } catch (err) {
    console.error('❌ Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:email/groups', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('groups');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.groups);
  } catch (err) {
    console.error('❌ Error fetching user groups:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:uid/cart', async (req, res) => {
  const { uid } = req.params;
  const { productId, quantity } = req.body;

  if (!productId) return res.status(400).json({ error: "productId is required" });

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check if product is already in cart
    const existingItem = user.cart.find(item => item.product.toString() === productId);

    if (existingItem) {
      // If product already exists in cart, increase quantity
      existingItem.quantity += quantity || 1;
    } else {
      // Add new product to cart
      user.cart.push({
        product: product._id,
        quantity: quantity || 1
      });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

router.get('/:uid/cart', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).populate('cart.product');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.cart);
  } catch (err) {
    console.error('❌ Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

router.delete('/:uid/cart/:productId', async (req, res) => {
  const { uid, productId } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();

    res.json({ message: "Removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove product" });
  }
});
module.exports = router;


