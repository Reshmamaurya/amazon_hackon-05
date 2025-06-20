const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contribution: {
    type: Number,
    default: 0,
  },
  hasPaid: {
    type: Boolean,
    default: false,
  }
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  transactionTitle: String,
  totalAmount: Number,
  members: [memberSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Group', groupSchema);
