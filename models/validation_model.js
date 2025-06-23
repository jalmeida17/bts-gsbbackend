const mongoose = require('mongoose')

const validationSchema = new mongoose.Schema({
    bill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bills',
        required: true
    },
    validationLevel: {
        type: Number,
        required: true, // 1, 2, 3, or 4
    },
    requiredRole: {
        type: String,
        required: true, // 'manager', 'financial-director', 'cfo', 'ceo'
    },
    validator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null // null until someone validates
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    validationDate: {
        type: Date,
        default: null
    },
    comments: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Validation = mongoose.model('Validation', validationSchema)
module.exports = Validation