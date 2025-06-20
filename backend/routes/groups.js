const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');


// router.get('/', async (req, res) => {
//   try {
//     const groups = await Group.find().populate('members.user', 'name email');
//     res.json(groups);
//   } catch (err) {
//     console.error('❌ Error fetching groups:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.post('/create-group', async (req, res) => {
//   console.log("🚀 Group creation request received", req.body);

//   const { name, creatorEmail, members, totalAmount, transactionTitle } = req.body;

//   try {
//     const creator = await User.findOne({ email: creatorEmail });
//     if (!creator) {
//       console.warn("❌ Creator not found for email:", creatorEmail);
//       return res.status(404).json({ message: 'Creator not found' });
//     }

//     // Ensure creator is included in members
//     const allMembers = [...members];
//     const creatorId = creator._id.toString();
//     const isCreatorIncluded = allMembers.some(m => m.userId.toString() === creatorId);
//     if (!isCreatorIncluded) {
//       allMembers.push({ userId: creator._id, contribution: 0 }); // or any logic
//     }

//     // Create and save group
//     const group = new Group({
//       name,
//       creator: creator._id,
//       members: allMembers.map(m => ({
//         user: m.userId,
//         contribution: m.contribution
//       })),
//       totalAmount,
//       transactionTitle
//     });

//     const savedGroup = await group.save();
//     console.log("✅ Group saved", savedGroup._id);

//     // Add group & notification to each user
//     for (const m of allMembers) {
//       const user = await User.findById(m.userId);
//       if (!user) continue;

//       const alreadyInGroup = user.groups.some(g => g.toString() === savedGroup._id.toString());
//       if (!alreadyInGroup) user.groups.push(savedGroup._id);

//       user.notifications.push({
//         message: `You’ve been added to group "${name}"`,
//         type: 'group-invite'
//       });

//       await user.save();
//     }

//     res.json({ message: 'Group created', group: savedGroup });
//   } catch (err) {
//     console.error("❌ Error in group creation:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


router.post('/create-group', async (req, res) => {
  console.log("🚀 Group creation request received", req.body);

  const {
    name,
    creatorEmail,
    members,
    totalAmount,
    transactionTitle,
    requiresPayment = true // ✅ Default to true if not provided
  } = req.body;

  try {
    const creator = await User.findOne({ email: creatorEmail });
    if (!creator) {
      console.warn("❌ Creator not found for email:", creatorEmail);
      return res.status(404).json({ message: 'Creator not found' });
    }

    const creatorId = creator._id.toString();
    const allMembers = [...members];
    const isCreatorIncluded = allMembers.some(m => m.userId.toString() === creatorId);

    if (!isCreatorIncluded) {
      allMembers.push({
        userId: creator._id,
        contribution: 0,
        hasPaid: false,
        status: 'accepted'
      });
    }

    const group = new Group({
      name,
      creator: creator._id,
      transactionTitle,
      totalAmount,
      requiresPayment, // ✅ NEW FIELD
      members: allMembers.map(m => ({
        userId: m.userId,
        contribution: m.contribution || 0,
        hasPaid: false,
        status: m.userId.toString() === creatorId ? 'accepted' : 'invited'
      }))
    });

    const savedGroup = await group.save();
    console.log("✅ Group saved", savedGroup._id);

    // Add group + notification to each member
    for (const m of allMembers) {
      const user = await User.findById(m.userId);
      if (!user) continue;

      const alreadyInGroup = user.groups.some(g => g.toString() === savedGroup._id.toString());
      if (!alreadyInGroup) user.groups.push(savedGroup._id);

      // Notification
      user.notifications.push({
        message: `You’ve been added to group "${name}"`,
        type: 'group-invite',
        group: savedGroup._id,
        status: 'pending',
        isRead: false
      });

      await user.save();
    }

    res.json({ message: 'Group created', group: savedGroup });
  } catch (err) {
    console.error("❌ Error in group creation:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
