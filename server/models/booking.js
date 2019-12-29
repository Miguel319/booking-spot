const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");

const BookingSchema = new Schema({
  startAt: {
    type: Date,
    required: [true, "The start Date is required."]
  },
  endAt: {
    type: Date,
    required: [true, "The ending date is required."]
  },
  totalPrice: Number,
  days: Number,
  guests: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rental"
  }
});



module.exports = mongoose.model("Booking", BookingSchema);
