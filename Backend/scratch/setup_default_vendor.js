const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');
const { VENDOR_STATUS } = require('../utils/constants');
require('dotenv').config();

const setupDefaultVendor = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const phone = '8765432109';
    let vendor = await Vendor.findOne({ phone });

    if (vendor) {
      console.log('Vendor already exists, updating password and status...');
      vendor.password = 'password123';
      vendor.approvalStatus = 'approved';
      await vendor.save();
      console.log('Vendor updated successfully.');
    } else {
      console.log('Vendor does not exist, creating one...');
      vendor = new Vendor({
        name: 'Default Vendor',
        email: 'vendor@example.com',
        phone,
        password: 'password123',
        businessName: 'Nexora Vendor Services',
        aadhar: {
          number: '123456789012',
          document: 'https://res.cloudinary.com/dummy-aadhar-front.jpg',
          backDocument: 'https://res.cloudinary.com/dummy-aadhar-back.jpg'
        },
        pan: {
          number: 'ABCDE1234F',
          document: 'https://res.cloudinary.com/dummy-pan.jpg'
        },
        approvalStatus: 'approved',
        isPhoneVerified: true,
        isEmailVerified: true
      });
      await vendor.save();
      console.log('Default vendor created successfully.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

setupDefaultVendor();
