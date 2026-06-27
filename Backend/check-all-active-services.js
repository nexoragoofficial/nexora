const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.MONGODB_URI) dotenv.config();

const Service = require('./models/UserService');
const Brand = require('./models/Brand');
const Category = require('./models/Category');

const run = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to:', uri);
    await mongoose.connect(uri);
    console.log('Connected to DB');

    const services = await Service.find({})
      .populate('brandId', 'title')
      .populate('categoryId', 'title')
      .lean();

    console.log(`Total services in DB: ${services.length}`);
    services.forEach(svc => {
      console.log(`- ID: ${svc._id}`);
      console.log(`  Title: "${svc.title}"`);
      console.log(`  Status: ${svc.status}`);
      console.log(`  Brand: ${svc.brandId ? svc.brandId.title : 'None'} (${svc.brandId ? svc.brandId._id : ''})`);
      console.log(`  Category: ${svc.categoryId ? svc.categoryId.title : 'None'} (${svc.categoryId ? svc.categoryId._id : ''})`);
      console.log(`  Vendor: ${svc.vendorId || 'None (Admin Service)'}`);
      console.log(`  OfferingType: ${svc.offeringType}`);
      console.log('---');
    });

    // Check all brands in DB
    const brands = await Brand.find({}).lean();
    console.log(`\nTotal brands in DB: ${brands.length}`);
    brands.forEach(b => {
      console.log(`- Brand ID: ${b._id}, Title: "${b.title}", Status: ${b.status}`);
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
