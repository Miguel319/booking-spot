const asyncHandler = require("../middleware/async");
const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const ErrorResponse = require("../helpers/errorResponse");
const moment = require("moment");

exports.createBooking = asyncHandler(async (req, res, next) => {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

  const user = await User.findById(req.user.id);

  await Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec(async (err, rentalRes) => {
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
          401,
          null,
          res
        );
      }

      if (!areDatesValid(booking)) {
        return sendErrResponse(
          "Invalid dates",
          "The end date must be greater than or equal to start date.",
          400,
          null,
          res
        );
      }

      if (!areDatesAvailable(booking, rentalRes)) {
        return sendErrResponse(
          "Invalid operation",
          "Choosen dates are already taken.",
          400,
          null,
          res
        );
      }

      booking.user = user;
      booking.rental = rentalRes;

      rentalRes.bookings.push(booking);

      try {
        await booking.save();
        await User.updateOne(
          { _id: user.id },
          { $push: { bookings: booking } }
        );
      } catch {
        return sendErrResponse(
          "Unable to perform operation",
          "Unable to save booking. Please try again.",
          400
        );
      }

      rentalRes.save();

      return res.status(200).json({
        success: true,
        startAt,
        endAt
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

const areDatesValid = proposedBooking =>
  moment(proposedBooking.endAt) >= moment(proposedBooking.startAt);

const areDatesAvailable = (proposedBooking, rental) => {
  let valid = true;

  if (rental.bookings) {
    valid = rental.bookings.every(booking => {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const start = moment(booking.startAt);
      const end = moment(booking.endAt);

      return (
        (start < proposedStart && end < proposedStart) ||
        (proposedEnd < end && proposedEnd < start)
      );
    });
  }

  return valid;
};
