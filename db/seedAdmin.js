const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const users = [{
    email: "jchorzempa@posteo.org",
    password: "Test123!",
    username:"Johannes"
}]

// Hash passwords before seeding
Promise.all(users.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return {
      email: user.email,
      password: hashedPassword,
      username: user.username
    };
  }))
  .then(hashedUsers => {
    const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/drumrecords_back';

    mongoose.connect(MONGO_URI)
    .then(() => {
      User.create(hashedUsers)
      .then(() => console.log('Database seeded with hashed passwords'))
      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
    })
    .catch(error => console.error(error));
  });

