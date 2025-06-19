const express = require('express');
const router = express.Router();
const User = require('../models/User');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
router.post('/llm-analysis', async (req, res) => {
  const { data } = req.body;

  if (!data) return res.status(400).json({ error: 'No data provided' });

  try {
    const prompt = `
    You're a helpful financial assistant. Based on the user's burn rate (spending data) for the entire period below,Summarize the following burn rate data in 2–3 sentences for a customer. 
    Focus on clarity, total amount spent, and any noticeable patterns (like peaks or steady periods).
    If you are writing money use Rs. symbol not dollar. If you don't get a data just write "No expennditure during this period"
    Avoid technical language or unnecessary phrases—just give them a simple and helpful spending summary:
    
    ${JSON.stringify(data)}
    `;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    const result = await response.json();

    const message = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";

    res.json({ analysis: message });

  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: "LLM analysis failed" });
  }
});


router.post('/analysis/category', async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'No data provided' });
    
    const prompt = `
      You're a concise financial assistant.

      Task: Write a short, professional 2–3 sentence summary of the spending data shown below. Only include:
      - Total amount spent (with 'Rs.' prefix, no dollar signs)
      - Any clear spending patterns (e.g., top categories, trends)
      - No greetings or filler like "Here’s a summary", "Okay", or "As requested"

      Be direct, helpful, and clear. If data is missing or empty, return only: "No expenditure during this period."

      Data:
      ${JSON.stringify(data, null, 2)}
      `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const result = await response.json();
    const message = result.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ analysis: message || "No insights generated." });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

router.post('/analysis/payment-method', async (req, res) => {
  try {
    const { data } = req.body;
  //  console.log(data);

    if (!data) return res.status(400).json({ error: 'No data provided' });

  //  console.log(data);
    const prompt = `
      You're a concise financial assistant.

      Task: Write a short, professional 2–3 sentence summary of the spending data shown below. Only include:
      - Total amount spent (with 'Rs.' prefix, no dollar signs)
      - Any clear spending patterns (e.g., top categories, trends)
      - No greetings or filler like "Here’s a summary", "Okay", or "As requested"

      Be direct, helpful, and clear. If data is missing or empty, return only: "No expenditure during this period."

      Data:
      ${JSON.stringify(data, null, 2)}
      `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
   // console.log(response);
    const result = await response.json();
    const message = result.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ analysis: message || "No insights generated." });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

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
