const asyncHandler = require("../middleware/async");
const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const ErrorResponse = require("../helpers/errorResponse");

exports.createBooking = asyncHandler(async (req, res, next) => {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

  const user = await User.findById(req.user.id);

  await Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec((err, rentalRes) => {
      if (err) {
        return sendErrResponse(
          "Rental not found",
          "Unable to find rental. Please try again.",
          404,
          next
        );
      }

      if (String(rentalRes.user._id) === String(user._id)) {
        return sendErrResponse(
          "Invalid operation",
          "You can't book your own rental.",
          400,
          null,
          res
        );
      }

      // TODO: Check if booking is valid

      res.status(200).json({
        success: true,
        booking,
        rentalRes
      });
    });
});

const sendErrResponse = (title, message, statusCode, next, res = null) => {
  if (statusCode === 404) {
    next(new ErrorResponse(title, message, statusCode));
  } else {
    res.status(statusCode).send({
      success: "false",
      title: title,
      message: message
    });
  }
};
