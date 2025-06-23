const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected'],
    default: 'pending'
  },
  type: {
    type: String,
    required: true,
  },
  // Validation tracking
  currentValidationLevel: {
    type: Number,
    default: 1 // Starts at level 1
  },
  maxValidationLevel: {
    type: Number,
    required: true // Set based on amount
  },
  validations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Validation'
  }],
  createdAt: {
    type: String,
    default: Date.now(),
  },
})

const Bill = mongoose.model('Bills', billSchema)
module.exports = Bill