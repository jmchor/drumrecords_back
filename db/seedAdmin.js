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
    const mongoURL = 'mongodb+srv://jchorzempa:dfOJiF2bxPA7Ba7c@drumrecordscluster.4praam0.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/drumrecords_back';

    mongoose.connect(mongoURL)
    .then(() => {
      console.log('Connected to database')
      User.create(hashedUsers)
      .then(() => console.log('Database seeded with hashed passwords'))
      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
    })
    .catch(error => console.error(error));
  });

