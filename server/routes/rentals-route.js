const express = require('express');
const router = express.Router();
const Rental = require('../models/rentals-model');


// Get all rentals
router.get('', (req, res) =>
  Rental.find({}, (err, data) => res.json(data)));


// Get Rental By Id
router.get('/:id', (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId, (err, data) => {
    if (err) res.status(422).send({
      errors: [{
        title: 'Rental Error',
        datail: 'Unable to find rental with that Id.'
      }]
    });

    res.json(data);
  });


});


module.exports = router;
