const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const rentalController = require("../controllers/rental");

// Get all rentals
router.get("", /*protect*/ rentalController.getRentals);

// Get Rental By Id
router.get("/:id", protect, rentalController.getRentalById);

module.exports = router;
