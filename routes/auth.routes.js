const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

// Login routes
router.post("/login", async (req, res, next) => {
  const { loginName, password } = req.body;

  try {

    if (loginName === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
    }

    //test if login word is email or username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    let email;
    let username;
    let foundUser;

    if (emailRegex.test(loginName)) {
      email = loginName;
      foundUser = await User.findOne({ email });
    } else {
      username = loginName;
      foundUser = await User.findOne({ username });
    }


    if (!foundUser) {
      res.status(400).json({ message: "User not found." });
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      const { _id, email, username } = foundUser;
      const payload = { _id, email, username };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken });
    } else {
      res.json({ message: "Unable to authenticate the user" });
    }
  } catch (error) {
    console.log(error);
    next(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);

  res.status(200).json(req.payload);
});

module.exports = router;
