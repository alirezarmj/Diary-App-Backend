const { compareSync, hashSync } = require("bcryptjs");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
    console.log(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }

  return res.status(200).json({ users });
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).populate("posts");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }

  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  return res.status(200).json({ user });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.length < 6) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  const hashedPassword = hashSync(password);

  let user;
  try {
    user = new User({ email, name, password: hashedPassword });
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }

  return res.status(201).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.length < 6) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "No user found" });
  }

  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res.status(200).json({ id: existingUser._id, message: "Login Successful" });
};

module.exports = { getAllUsers, signup, login, getUserById };
