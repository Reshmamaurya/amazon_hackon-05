const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/payment-breakdown/:uid', async (req, res) => {
  try {
    const uid = req.params.uid.trim();
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Missing date range" });
    }

    const user = await User.findOne({ uid: { $eq: uid } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const start = new Date(startDate);
    const end = new Date(endDate);

    const payments = (user.payments || []).filter(p => {
      const date = new Date(p.timestamp); // ✅ fixed this line
      return date >= start && date <= end;
    });

    const breakdown = {};
    payments.forEach(p => {
      breakdown[p.method] = (breakdown[p.method] || 0) + p.amount;
    });

    res.json(breakdown);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute breakdown" });
  }
});


// 🔹 GET burn rate for a user within a date range
router.get('/payments/burnrate/:uid', async (req, res) => {
  try {
    const uid = req.params.uid?.trim();
    const startDate = new Date(req.query.start);
    const endDate = new Date(req.query.end);
    console.log("Hit burnrate route", uid, startDate, endDate);

    if (!uid || isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ error: 'Missing or invalid uid/start/end' });
    }

    const result = await User.aggregate([
      { $match: { uid: uid } },
      { $unwind: '$payments' },
      {
        $match: {
          'payments.timestamp': {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$payments.timestamp" }
          },
          totalSpent: { $sum: "$payments.amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result); // [{ _id: "2025-06-15", totalSpent: 1200 }, ...]
  } catch (err) {
    console.error('Burnrate error:', err);
    res.status(500).json({ error: "Failed to compute burn rate" });
  }
});

router.get('/payments/category-summary/:uid', async (req, res) => {
  const { uid } = req.params;
  const { start, end } = req.query;

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const startDate = new Date(start);
    const endDate = new Date(end);

    const categoryMap = {};
    for (const payment of user.payments) {
      const payDate = new Date(payment.timestamp);
      if (payDate >= startDate && payDate <= endDate) {
        const category = payment.category || 'Uncategorized';
        categoryMap[category] = (categoryMap[category] || 0) + payment.amount;
      }
    }

    const summary = Object.entries(categoryMap).map(([category, total]) => ({
      category,
      total,
    }));

    res.json(summary);
  } catch (err) {
    console.error('Error in category-summary:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
