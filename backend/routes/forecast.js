const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Forecast total amount for next 30 days
router.get('/forecast/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    console.log(uid);
    if (!user || !user.payments || user.payments.length === 0) {
      return res.status(404).json({ message: 'No payment history found.' });
    }

    // Filter payments from the last X days (e.g., 60 days)
    const now = new Date();
    const pastPayments = user.payments.filter(p =>
      (now - new Date(p.timestamp)) / (1000 * 60 * 60 * 24) <= 60
    );

    if (pastPayments.length < 3) {
      return res.status(400).json({ message: 'Not enough data to forecast.' });
    }

    // Calculate average daily spending
    const totalSpent = pastPayments.reduce((sum, p) => sum + p.amount, 0);
    const days = 60;
    const dailyAvg = totalSpent / days;

    const forecast = dailyAvg * 30;

    res.json({ forecast, dailyAvg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
