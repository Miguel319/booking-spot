const User = require("../models/user-model");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/async");

exports.signup = asyncHandler(async (req, res, next) => {
   const { username, email, password } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password
  });

  res
    .status(200)
    .json({ success: true, message: "User created successfully." });
});
