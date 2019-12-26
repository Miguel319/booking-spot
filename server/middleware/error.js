const ErrorResponse = require("../helpers/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  let title = "Unexpected Error";
  let msg = "";

  error.message = err.message;
  console.log(error);

  // Required fields
  if (err.message.includes("mandatory")) {
    title = "Required fields";
    msg = `${err.message[0]} is mandatory.`;
    error = new ErrorResponse(title, msg, 400);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    record = err.message.includes("username")
      ? "a username"
      : err.message.includes("email")
      ? "an email"
      : "a record";

    title = "Duplicate data";
    msg = `There's already ${record} of this value in the database.`;
    error = new ErrorResponse(title, msg, 401);
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    title = "Data not found";
    msg = `Unable to find ${err.value}.`;
    error = new ErrorResponse(title, msg, 404);
  }

  // Check the username's length
  if (req.body.username && req.body.username.length < 4) {
    title = "Username is too short";
    msg = "The must be at least 4 characters long.";
    error = new ErrorResponse(title, msg, 400);
  }

  // Check whether passwords match
  if (req.body.passwordConfirmation) {
    const { password, passwordConfirmation } = req.body;

    if (passwordConfirmation !== password) {
      title = "Passwords must match";
      msg = "The password must be the same as the confirmation.";
      error = new ErrorResponse(title, msg, 400);

      return res.status(error.statusCode).json({
        success: false,
        title: title,
        message: error.message
      });
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    title: title,
    message: error.message || "Server Error"
  });
};

module.exports = errorHandler;
