const mongoose = require('mongoose')
const sha256 = require('js-sha256')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    subRole: {
        type: String,
        required: false,
        default: null,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
})

// Add a virtual or method to handle legacy users
userSchema.methods.getSubRole = function() {
    return this.subRole || null; // Returns null if subRole doesn't exist
};

// Pre-find middleware to ensure subRole exists
userSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function() {
    // This ensures that when we query users, those without subRole get null
    this.select('+subRole');
});

userSchema.pre('save', async function(next) {
    const existingUser = await User.findOne({ email: this.email })
    if (existingUser) {
        throw new Error('User already exists', { cause: 400 })
    }
    this.password = sha256(this.password + process.env.SALT)
    
    // Ensure subRole is set for new users
    if (this.subRole === undefined) {
        this.subRole = null;
    }
    
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User