const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const globalEmitter = require("../emitter/globalEmitter");
require("dotenv").config();

async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ error: errors.array() });
  }
  let { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env["SECRET_KEY"],
      {
        expiresIn: "20m",
      }
    );
    res.json({ token: token });
    globalEmitter.emit("Signup", result._id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ error: errors.array() });
  }
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User Doesn't Exists" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env["SECRET_KEY"],
      {
        expiresIn: "20m",
      }
    );
    res.json({ token });
    globalEmitter.emit("login", user._id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { signup, login };
