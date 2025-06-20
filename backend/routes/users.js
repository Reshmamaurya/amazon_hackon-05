// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const mongoose = require('mongoose');

// // Send Friend Request
// router.post('/friend-request', async (req, res) => {
//   const { fromEmail, toEmail } = req.body;

//   try {
//     const toUser = await User.findOne({ email: toEmail });
//     const fromUser = await User.findOne({ email: fromEmail });

//     if (!toUser || !fromUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Send notification
//     toUser.notifications.push({
//       message: `${fromUser.name} sent you a friend request`,
//       type: 'friend-request'
//     });

//     // Don't add as friend yet (wait for acceptance)

//     await toUser.save();
//     res.json({ message: 'Friend request sent' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Accept Friend Request
// router.post('/accept-friend', async (req, res) => {
//   const { userEmail, friendEmail } = req.body;

//   try {
//     const user = await User.findOne({ email: userEmail });
//     const friend = await User.findOne({ email: friendEmail });

//     if (!user || !friend) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Add each other as friends (ObjectId references)
//     if (!user.friends.includes(friend._id)) {
//       user.friends.push(friend._id);
//     }
//     if (!friend.friends.includes(user._id)) {
//       friend.friends.push(user._id);
//     }

//     await user.save();
//     await friend.save();

//     res.json({ message: 'Friend request accepted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Route to get friends for a user
// // Get user's friends
// router.get('/friends/:email', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email }).populate('friends');
//     res.json(user.friends);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch friends' });
//   }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

module.exports = router;


