const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Group = require('../models/Group'); 

// ✅ Get user by email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:email/groups/:groupId/pay', async (req, res) => {
  const { email, groupId } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const member = group.members.find(m => m.userId.toString() === user._id.toString());
    if (!member || member.status !== 'accepted') {
      return res.status(400).json({ message: 'You are not an accepted member of this group' });
    }

    if (member.hasPaid) {
      return res.status(400).json({ message: 'Payment already completed' });
    }

    member.hasPaid = true;
    member.paidAt = new Date(); // Optional field if you want

    await group.save();

    // Notify group creator
    const creator = await User.findById(group.creator);
    if (creator) {
      creator.notifications.push({
        message: `${user.name} has completed payment for "${group.name}"`,
        type: 'payment-confirmation',
        group: group._id,
        isRead: false,
        status: 'done'
      });
      await creator.save();
    }

    res.json({ message: 'Payment marked as complete' });
  } catch (err) {
    console.error('❌ Error completing payment:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.post('/:email/notifications/:notificationId/respond', async (req, res) => {
  const { action } = req.body;
  const { email, notificationId } = req.params;

  try {
    const user = await User.findOne({ email }).populate('notifications.from').populate('notifications.group');
    const notification = user.notifications.id(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.status = action;
    notification.isRead = true;

    
      if (notification.type === 'friend-request') {
       const fromUser = await User.findById(notification.from);

  if (!fromUser) {
    return res.status(404).json({ message: 'Sender user not found' });
  }

  if (!user.friends.includes(fromUser._id)) {
    user.friends.push(fromUser._id);
  }

  if (!fromUser.friends.includes(user._id)) {
    fromUser.friends.push(user._id);
    await fromUser.save();
  }
   await user.save();
    if (notification.type === 'group-invite') {
  const group = await Group.findById(notification.group);

  if (!group) {
    return res.status(404).json({ message: 'Group not found' });
  }

  // Add user to group.members if not already there
  const alreadyInGroup = group.members.some(m => m.userId.toString() === user._id.toString());
  if (!alreadyInGroup) {
    group.members.push({
      userId: user._id,
      status: 'accepted',
      hasPaid: false
    });

    await group.save();

    // Add group to user's list
    if (!user.groups.includes(group._id)) {
      user.groups.push(group._id);
    }

    // Send payment reminder notification
    u// 1. Send payment reminder to accepting user
user.notifications.push({
  message: `Please complete your payment for the group "${group.name}"`,
  type: 'payment-reminder',
  group: group._id,
  isRead: false,
  status: 'pending'
});

// 2. Notify other accepted members to pay if not already paid
const otherAcceptedMembers = group.members.filter(
  m => m.status === 'accepted' && m.userId.toString() !== user._id.toString()
);

for (const member of otherAcceptedMembers) {
  const memberUser = await User.findById(member.userId);

  if (memberUser) {
    const alreadyNotified = memberUser.notifications.some(
      n => n.type === 'payment-reminder' &&
           n.group?.toString() === group._id.toString()
    );

    if (!alreadyNotified) {
      memberUser.notifications.push({
        message: `Please complete your payment for the group "${group.name}"`,
        type: 'payment-reminder',
        group: group._id,
        isRead: false,
        status: 'pending'
      });
      await memberUser.save(); // Save after adding notification
    }
  }
}

  }
}
await group.save();  // already exists
await user.save();   // save current user

    }

    await user.save();
    res.json({ message: `Notification ${action}` });
  } catch (err) {
    console.error('❌ Error responding to notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Send Friend Request
router.post('/friend-request', async (req, res) => {
  const { fromEmail, toEmail } = req.body;

  try {
    const fromUser = await User.findOne({ email: fromEmail });
    const toUser = await User.findOne({ email: toEmail });

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyRequested = toUser.notifications.some(n =>
      n.type === 'friend-request' &&
      n.from?.toString() === fromUser._id.toString() &&
      n.status === 'pending'
    );

    if (alreadyRequested) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    toUser.notifications.push({
      message: `${fromUser.name} sent you a friend request`,
      type: 'friend-request',
      from: fromUser._id,
      status: 'pending',
      isRead: false
    });

    await toUser.save();
    res.json({ message: 'Friend request sent' });
  } catch (err) {
    console.error('❌ Error sending friend request:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Accept Friend Manually (Optional fallback route)
router.post('/accept-friend', async (req, res) => {
  const { userEmail, friendEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    const friend = await User.findOne({ email: friendEmail });

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friends.includes(friend._id)) user.friends.push(friend._id);
    if (!friend.friends.includes(user._id)) friend.friends.push(user._id);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request accepted manually' });
  } catch (err) {
    console.error('❌ Error manually accepting friend:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Friends
router.get('/:email/friends', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.friends);
  } catch (err) {
    console.error('❌ Error fetching friends:', err);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

// ✅ Get Notifications
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

// ✅ Get Groups
router.get('/:email/groups', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('groups');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.groups);
  } catch (err) {
    console.error('❌ Error fetching groups:', err);
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
