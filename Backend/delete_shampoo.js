const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.MONGODB_URI) dotenv.config();

const Category = require('./models/Category');

const run = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('Connected to DB');

    // Find and inspect Shampoo categories
    const shampooCats = await Category.find({ title: /shampoo/i });
    console.log(`Found ${shampooCats.length} Shampoo categories:`);
    shampooCats.forEach(c => {
      console.log(`ID: ${c._id}, Title: ${c.title}, Slug: ${c.slug}, Status: ${c.status}, OfferingType: ${c.offeringType}`);
    });

    // Delete soft-deleted Shampoo category if any
    const deleteResult = await Category.deleteMany({ title: /shampoo/i, status: 'deleted' });
    console.log(`Deleted ${deleteResult.deletedCount} soft-deleted shampoo categories.`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
