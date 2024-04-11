const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

/**
 * Registers a new user with email and password.
 * Hashes the password before saving the user to the database.
 *
 * @route POST /users/register
 * @access Public
 * @param {Object} req - The request object containing the email and password.
 * @param {Object} res - The response object.
 * @throws {Error} If email or password is missing, or if the user already exists.
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are mandatory!" });
    return;
    // throw new Error("All fields are mandatory!");
  }
  const userNotAvailable = await User.findOne({ email });
  if (userNotAvailable) {
    console.log(`User already registered ${userNotAvailable}`);
    res
      .status(400)
      .json({ message: "An account with this email already exists!" });
    return;
    // throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ message: "User signed up successfully" });
  } else {
    res.status(400).json({ message: "User data is not valid" });
  }
});

/**
 * Authenticates a user by comparing the provided password with the hashed password stored in the database.
 * Generates a JWT token for the session if authentication is successful.
 *
 * @route POST /users/login
 * @access Public
 * @param {Object} req - The request object containing the email and password.
 * @param {Object} res - The response object.
 * @throws {Error} If email or password is missing, or if authentication fails.
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

/**
 * Retrieves the current user's information.
 *
 * @route POST /users/current
 * @access Private
 * @param {Object} req - The request object, expected to contain the user's information.
 * @param {Object} res - The response object.
 */
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

/**
 * @route POST /users/logout
 * @access Private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = { registerUser, loginUser, currentUser, logoutUser };
