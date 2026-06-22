const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const setupDefaultUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const phone = '9876543210';
    let user = await User.findOne({ phone });

    if (user) {
      console.log('User already exists, updating password...');
      user.password = 'password123';
      await user.save();
      console.log('User password updated successfully.');
    } else {
      console.log('User does not exist, creating one...');
      user = new User({
        name: 'Default User',
        phone,
        password: 'password123',
        role: 'user',
        isPhoneVerified: true
      });
      await user.save();
      console.log('Default user created successfully.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

setupDefaultUser();
