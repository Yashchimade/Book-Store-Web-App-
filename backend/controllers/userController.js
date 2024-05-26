const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Attempting to log in user:", email);
    const user = await User.login(email, password);
    const token = createToken(user._id);

    var da = await User.findOne({ email });

    if (da == null) {
      console.log("User not found");
      res.status(400).json({ error: "User not found" });
    } else {
      console.log("User logged in successfully");
      const fname = user.fname;
      const userId = user._id;
      res.status(200).json({ email, fname, _id: userId, token });
    }
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { fname, email, phonenumber, password } = req.body;

  try {
    console.log("Attempting to sign up user:", email);
    const user = await User.signup(fname, email, phonenumber, password);
    const token = createToken(user._id);

    console.log("User signed up successfully");
    res.status(200).json({ email, fname, phonenumber, _id: user._id, token });
  } catch (error) {
    console.error("Error signing up user:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };