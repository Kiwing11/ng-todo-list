const mongoose = require("mongoose");
const { isEmail } = require("validator");
const taskSchema = require("./taskModel");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [3, "Password must be at least 3 characters long"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
