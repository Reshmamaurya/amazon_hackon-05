

const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contribution: {
    type: Number,
    default: 0,
  },
  hasPaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['invited', 'accepted', 'declined'],
    default: 'invited',
  }
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  transactionTitle: String,
  totalAmount: Number,
  requiresPayment: {              // ✅ NEW FIELD
    type: Boolean,
    default: true                // You can set false for free groups
  },
  members: [memberSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Group', groupSchema);
