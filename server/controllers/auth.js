const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../helpers/errorResponse");
const { JWT_COOKIE_EXPIRE } = require("../config/dev");

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, email, password, passwordConfirmation } = req.body;

  // Make sure the user confirmed the password
  if (!passwordConfirmation) {
    return next(
      new ErrorResponse(
        "Confirmation required",
        "Please confirm the password.",
        400
      )
    );
  }

  // Make sure the passwords match
  if (passwordConfirmation !== password) {
    return next(
      new ErrorResponse(
        "Passwords don't match",
        "The password must be the same as the confirmation.",
        400
      )
    );
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password
  });

  const token = user.getSignedJWTToken();

  res
    .status(200)
    .json({ success: true, message: "User created successfully.", token });
});

exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);

  // Validate email & password
  if (!email || !password) {
    return next(
      new ErrorResponse(
        "Missing data",
        "The email and password fields are required.",
        400
      )
    );
  }

  // Make sure email exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorResponse(
        "Invalid credentials",
        "Please check your credentials and try again.",
        401
      )
    );
  }

  // Make sure the password is valid
  const isPasswordValid = await user.matchPassword(password);

  if (!isPasswordValid) {
    return res.status(401).send({
      success: false,
      title: "Invalid credentials",
      message: "Please check your credentials and try again."
    });
  }

  const token = user.getSignedJWTToken();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") options.secure = true;

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token
    });
};

// Get currently logged in user
exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const username = user.username
    ? user.username
    : user.email.substr(0, user.email.indexOf("@"));

  res.status(200).json({
    success: true,
    user
  });
});
