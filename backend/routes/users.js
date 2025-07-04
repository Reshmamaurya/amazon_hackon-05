const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Group = require('../models/Group'); 
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

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
// router.post('/:email/notifications/:notificationId/respond', async (req, res) => {
//   console.log('📩 /notifications/:notificationId/respond route hit!');
//   const { action } = req.body;
//   const {email,notificationId} = req.params;
//   console.log(email);
//   console.log(notificationId);
//   try {
//     const user = await User.findOne({ email }).populate('notifications.from').populate('notifications.group');
//     const notification = user.notifications.id(notificationId);
    
//     if (!notification) {
//       return res.status(404).json({ message: 'Notification not found' });
//     }

//     notification.status = action;
//     notification.isRead = true;

    
//       if (notification.type === 'friend-request') {
//        const fromUser = await User.findById(notification.from);

//   if (!fromUser) {
//     return res.status(404).json({ message: 'Sender user not found' });
//   }

//   if (!user.friends.includes(fromUser._id)) {
//     user.friends.push(fromUser._id);
//   }

//   if (!fromUser.friends.includes(user._id)) {
//     fromUser.friends.push(user._id);
//     await fromUser.save();
//   }
//    await user.save();
// if (notification.type === 'group-invite') {
//   const group = await Group.findById(notification.group);
//   console.log(group._id);
//   if (!group) {
//     console.log("hello");
//     return res.status(404).json({ message: 'Group not found' });
//   }

//   // Add or update membership
//   const member = Group.members.find(m => m.userId.toString() === user._id.toString());

//   console.log(member);
//   if (!member) {
//     Group.members.push({
//       userId: user._id,
//       status: 'accepted',
//       hasPaid: false
//     });
//   } 

//   if (!User.groups.includes(group._id)) {
//     User.groups.push(group._id);
//   }

//   // Notify accepting user to pay
//   User.notifications.push({
//     message: `Please complete your payment for the group "${group.name}"`,
//     type: 'payment-reminder',
//     group: group._id,
//     isRead: false,
//     status: 'pending'
//   });

//   // Notify other accepted members to pay
//   const otherAcceptedMembers = Group.members.filter(
//     m => m.status === 'accepted' && m.userId.toString() !== user._id.toString()
//   );

//   for (const member of otherAcceptedMembers) {
//     const memberUser = await User.findById(member.userId);
//     if (memberUser) {
//       const alreadyNotified = memberUser.notifications.some(
//         n => n.type === 'payment-reminder' &&
//              n.group?.toString() === group._id.toString()
//       );

//       if (!alreadyNotified) {
//         memberUser.notifications.push({
//           message: `Please complete your payment for the group "${group.name}"`,
//           type: 'payment-reminder',
//           group: group._id,
//           isRead: false,
//           status: 'pending'
//         });
//         await memberUser.save();
//       }
//     }
//   }

//   await group.save();
// }

// await group.save();  // already exists
// await user.save();   // save current user

//     }

//     await user.save();
//     res.json({ message: `Notification ${action}` });
//   } catch (err) {
//     console.error('❌ Error responding to notification:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // ✅ Send Friend Request
// router.post('/friend-request', async (req, res) => {
//   const { fromEmail, toEmail } = req.body;

//   try {
//     const fromUser = await User.findOne({ email: fromEmail });
//     const toUser = await User.findOne({ email: toEmail });

//     if (!fromUser || !toUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const alreadyRequested = toUser.notifications.some(n =>
//       n.type === 'friend-request' &&
//       n.from?.toString() === fromUser._id.toString() &&
//       n.status === 'pending'
//     );

//     if (alreadyRequested) {
//       return res.status(400).json({ message: 'Friend request already sent' });
//     }

//     toUser.notifications.push({
//       message: `${fromUser.name} sent you a friend request`,
//       type: 'friend-request',
//       from: fromUser._id,
//       status: 'pending',
//       isRead: false
//     });

//     await toUser.save();
//     res.json({ message: 'Friend request sent' });
//   } catch (err) {
//     console.error('❌ Error sending friend request:', err);
//     res.status(500).json({ error: err.message });
//   }
// });


router.post('/:email/notifications/:notificationId/respond', async (req, res) => {
  console.log('📩 Route hit: /notifications/:notificationId/respond');
  const { action } = req.body;
  const { email, notificationId } = req.params;
  console.log('📧 Email:', email);
  console.log('🔔 Notification ID:', notificationId);
  console.log('📝 Action:', action);

  try {
    const user = await User.findOne({ email })
      .populate('notifications.from')
      .populate('notifications.group');

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const notification = user.notifications.id(notificationId);
    if (!notification) {
      console.log('❌ Notification not found');
      return res.status(404).json({ message: 'Notification not found' });
    }

    console.log('📬 Notification found:', notification.type);

    notification.status = action;
    notification.isRead = true;

    // FRIEND REQUEST HANDLER
    if (notification.type === 'friend-request') {
      console.log('👥 Processing friend request');
      const fromUser = await User.findById(notification.from);

      if (!fromUser) {
        console.log('❌ Sender user not found');
        return res.status(404).json({ message: 'Sender user not found' });
      }

      if (!user.friends.includes(fromUser._id)) {
        user.friends.push(fromUser._id);
        console.log('✅ Added sender to user\'s friends');
      }

      if (!fromUser.friends.includes(user._id)) {
        fromUser.friends.push(user._id);
        await fromUser.save();
        console.log('✅ Added user to sender\'s friends');
      }

      await user.save();
    }

    // GROUP INVITE HANDLER
    if (notification.type === 'group-invite') {
      console.log('👥 Processing group invite');
      const group = await Group.findById(notification.group);

      if (!group) {
        console.log('❌ Group not found');
        return res.status(404).json({ message: 'Group not found' });
      }

      const member = group.members.find(m => m.userId.toString() === user._id.toString());
      console.log('👤 Member before update:', member);

   if (member.status === 'invited') {
  member.status = 'accepted';
  console.log('✅ Member status updated to accepted');
} else {
  console.log('ℹ️ Member already accepted or paid');
}

      

      // if (!user.groups.includes(group._id)) {
      //   user.groups.push(group._id);
      //   console.log('✅ Group added to user.groups');
      // }

      // Notify the accepting user
      // user.notifications.push({
      //   message: `Please complete your payment for the group "${group.name}"`,
      //   type: 'payment-reminder',
      //   group: group._id,
      //   isRead: false,
      //   status: 'pending'
      // });
      // console.log('📣 Payment reminder sent to user');

      // // Notify other members
      // const otherAcceptedMembers = group.members.filter(
      //   m => m.status === 'accepted' && m.userId.toString() !== user._id.toString()
      // );

      // for (const member of otherAcceptedMembers) {
      //   const memberUser = await User.findById(member.userId);
      //   if (memberUser) {
      //     const alreadyNotified = memberUser.notifications.some(
      //       n => n.type === 'payment-reminder' && n.group?.toString() === group._id.toString()
      //     );

      //     if (!alreadyNotified) {
      //       memberUser.notifications.push({
      //         message: `Please complete your payment for the group "${group.name}"`,
      //         type: 'payment-reminder',
      //         group: group._id,
      //         isRead: false,
      //         status: 'pending'
      //       });
      //       await memberUser.save();
      //       console.log(`📨 Payment reminder sent to ${memberUser.email}`);
      //     }
      //   }
      // }

      await group.save();
    }

    await user.save();
    console.log('✅ All changes saved successfully');
    res.json({ message: `Notification ${action}` });

  } catch (err) {
    console.error('❌ Error responding to notification:', err);
    res.status(500).json({ error: 'Server error' });
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
    // const user = await User.findOne({ uid: req.params.uid }).populate('cart.product');
    // if (!user) return res.status(404).json({ error: 'User not found' });

    // res.json(user.cart);
    const user = await User.findOne({ uid: req.params.uid }).populate('cart.product');
   const validCart = user.cart.filter(item => item.product !== null);   
res.json(validCart);

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


router.put('/:uid/shared-cart/:productId/shared-with', async (req, res) => {
  const { uid, productId } = req.params;
  const { sharedWith } = req.body;

  try {
    const owner = await User.findOne({ uid });
    if (!owner) return res.status(404).json({ error: 'User not found' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Update the owner's cart item's sharedWith list
    const itemIndex = owner.sharedCart.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex >= 0) {
      owner.sharedCart[itemIndex].sharedWith = sharedWith;
    }

    // Add to each friend's sharedCart
    for (const friendId of sharedWith) {
      const friend = await User.findById(friendId);
      if (!friend) continue;

      // Check if product already exists in friend's sharedCart
      const alreadyShared = friend.sharedCart.some(
        (item) => item.product.toString() === productId
      );
      if (!alreadyShared) {
        friend.sharedCart.push({
          product: product._id,
          sharedWith: [], // optional: you can ignore or use this if they want to re-share
        });
        await friend.save();
      }
    }

    await owner.save();
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error updating sharedWith:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/uid/:uid/friends', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid }).populate('friends', 'name uid');
    if (!user) {
      console.log("⚠️ No user found with UID:", uid);
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.friends);
  } catch (err) {
    console.error('❌ Error fetching friends:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/:uid/shared-cart', async (req, res) => {
  const { uid } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if already exists in sharedCart
    const alreadyExists = user.sharedCart.some(
      item => item.product.toString() === productId
    );
    if (!alreadyExists) {
      user.sharedCart.push({
        product: productId,
        addedBy: user._id, // optional: tracking who moved it
        sharedWith: [],    // empty for now
      });
    }

    // Remove from personal cart
    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to move item to shared cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// backend route: GET /api/users/:uid/shared-cart
router.get('/:uid/shared-cart', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid })
      .populate('sharedCart.product')
      .populate('sharedCart.sharedWith', 'name uid');

    if (!user) return res.status(404).json({ error: 'User not found' });

    // ✅ Deep filter to exclude broken or partially populated items
    const safeCart = user.sharedCart.filter(
      item => item.product && item.product._id
    );

    res.json(safeCart);
  } catch (err) {
    console.error('❌ Error fetching shared cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
