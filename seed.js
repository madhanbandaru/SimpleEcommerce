const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();
const connectDB = require('./config/db');

const seed = async () => {
  await connectDB();

  const admin = await User.findOne({ email: 'admin@example.com' });
  if (!admin) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
      role: 'admin'
    });
    console.log('✅ Admin user created: admin@example.com / admin123');
  }

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      {
        name: 'Laptop Pro',
        description: 'Powerful laptop for developers',
        price: 1500,
        category: 'Electronics',
        stock: 10
      },
      {
        name: 'Shoes',
        description: 'Running shoes',
        price: 100,
        category: 'Sports',
        stock: 50
      }
    ]);
    console.log('✅ Sample products added');
  }

  process.exit();
};

seed();
