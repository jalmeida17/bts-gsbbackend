const mongoose = require('mongoose');
const User = require('../models/user_model');
require('dotenv').config();

const addSubRoleToExistingUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update all users that don't have a subRole field
        const result = await User.updateMany(
            { subRole: { $exists: false } }, // Find users without subRole field
            { $set: { subRole: null } }      // Set subRole to null
        );

        console.log(`Updated ${result.modifiedCount} users with subRole field`);
        
        // Alternatively, you could set a default subRole based on existing role:
        // await User.updateMany(
        //     { role: 'admin', subRole: { $exists: false } },
        //     { $set: { subRole: 'super-admin' } }
        // );
        
        await mongoose.disconnect();
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

addSubRoleToExistingUsers();