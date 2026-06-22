const mongoose = require('mongoose');
require('dotenv').config();

const dumpVendorServiceCatalogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const data = await mongoose.connection.db.collection('vendorservicecatalogs').find({}).toArray();
    console.log(JSON.stringify(data, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

dumpVendorServiceCatalogs();
