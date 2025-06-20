// forecast.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { spawn } = require('child_process');

router.get('/forecast/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (!user || !user.payments || user.payments.length < 5) {
      return res.status(400).json({ message: 'Not enough payment data' });
    }

    // prepare data to send to Python
    const paymentHistory = user.payments.map(p => ({
      amount: p.amount,
      date: new Date(p.timestamp).toISOString().split('T')[0]
    }));

    const py = spawn('python', ['forecast.py']);
    let result = '';

    py.stdin.write(JSON.stringify(paymentHistory));
    py.stdin.end();

    py.stdout.on('data', (data) => result += data.toString());
    py.stderr.on('data', (err) => console.error('Python Error:', err.toString()));

    py.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ message: 'Python forecast script failed' });
      }

      try {
        const forecast = JSON.parse(result);
        res.json(forecast); // send to frontend
      } catch (e) {
        console.error('Failed to parse Python output:', result);
        res.status(500).json({ message: 'Failed to parse forecast output' });
      }
    });

  } catch (err) {
    console.error('Forecast route error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
