const Rental = require("../models/rental");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../helpers/errorResponse");

exports.getRentals = asyncHandler(
  async (req, res, next) =>
    await Rental.find({})
      .select("-bookings")
      .exec((err, data) => res.json(data))
);

exports.getRentalById = asyncHandler(async (req, res, next) => {
  const rentalId = req.params.id;

  await Rental.findById(rentalId)
    .populate("user", "username email -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, rentalRes) => {
      if (err) return dataNotFound(next);

      res.json(rentalRes);
    });
});

const dataNotFound = next =>
  next(
    new ErrorResponse(
      "Data not found",
      "Unable to find rental with that ID.",
      404
    )
  );
