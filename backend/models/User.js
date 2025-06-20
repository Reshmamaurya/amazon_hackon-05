const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: { type: String, required: true, unique: true, index: true },
  name: String,
  email: { type: String, required: true, unique: true },
  payments: [{
    amount: Number,
    method: String,
    category: String,
    timestamp: Date,
  }],
  notifications: [
  {
    message: String,
    type: {
      type: String,
      enum: ['friend-request', 'group-invite', 'payment-reminder', 'payment-confirmation'],
      default: 'friend-request',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'done'],
      default: 'pending',
    },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },   // ✅ Needed for populate
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // ✅ Needed for populate
    isRead: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
],

  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],

  cart: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
});

module.exports = mongoose.model('User', userSchema);
