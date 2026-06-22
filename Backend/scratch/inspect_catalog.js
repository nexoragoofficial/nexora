const mongoose = require('mongoose');
const Category = require('../models/Category');
const Service = require('../models/Service');
const UserService = require('../models/UserService');
const Brand = require('../models/Brand');
require('dotenv').config();

const inspect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const totalCategories = await Category.countDocuments();
    const categories = await Category.find({}).lean();
    console.log(`Total Categories: ${totalCategories}`);
    categories.forEach(c => {
      console.log(`- Cat: ${c.title} (${c._id}) | slug: ${c.slug} | status: ${c.status} | cityIds: ${c.cityIds}`);
    });

    const totalBrands = await Brand.countDocuments();
    const brands = await Brand.find({}).lean();
    console.log(`\nTotal Brands: ${totalBrands}`);
    brands.forEach(b => {
      console.log(`- Brand: ${b.title} (${b._id}) | categoryIds: ${b.categoryIds}`);
    });

    const totalServices = await Service.countDocuments();
    const services = await Service.find({}).lean();
    console.log(`\nTotal Services (from Service model): ${totalServices}`);
    services.forEach(s => {
      console.log(`- Svc: ${s.title} (${s._id}) | brandId: ${s.brandId} | categoryId: ${s.categoryId} | vendorId: ${s.vendorId}`);
    });

    const totalUserServices = await UserService.countDocuments();
    const userServices = await UserService.find({}).lean();
    console.log(`\nTotal UserServices (from UserService model): ${totalUserServices}`);
    userServices.forEach(s => {
      console.log(`- USvc: ${s.title} (${s._id}) | brandId: ${s.brandId} | categoryId: ${s.categoryId} | vendorId: ${s.vendorId}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

inspect();
