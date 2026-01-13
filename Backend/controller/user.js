const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password is required" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email is already exist" });
  }

  const hashPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPwd,
  });

  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
  return res.status(200).json({ token, user: newUser });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  // User not found
  if (!user) {
    return res.status(404).json({
      message: "User not found. Please sign up.",
    });
  }

  //  Wrong password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

  // Success
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  return res.status(200).json({ token, user });
};


const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({email:user.email})
};

module.exports = { userLogin, userSignUp, getUser };
