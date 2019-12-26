const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../helpers/errorResponse");
const User = require("../models/user");
const { SECRET } = require("../config/dev");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } /* else if(req.cookies.token) {
      token = req.cookies.token;
  }*/

  // Make sure token exists
  if (!token) {
    return next(
      new ErrorResponse(
        "Unauthorized",
        "Not authorized to access this route.",
        401
      )
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse(
        "Unauthorized",
        "Not authorized to access this route.",
        401
      )
    );
  }
});
