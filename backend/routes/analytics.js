const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🔹 GET payment method breakdown for a user
router.get('/payment-breakdown/:uid', async (req, res) => {
  try {
    const uid = req.params.uid.trim();
    const user = await User.findOne({ uid: { $eq: uid } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const payments = user.payments || [];
    const breakdown = {};

    payments.forEach(p => {
      breakdown[p.method] = (breakdown[p.method] || 0) + p.amount;
    });

    res.json(breakdown); // ✅ send raw ₹ amounts
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute breakdown" });
  }
});

module.exports = router;
