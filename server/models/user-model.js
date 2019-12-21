const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, 'The username must have at least 4 characters.'],
    max: [32, 'The username can\'t have  more than 32 characters.']
  },
  email: {
    type: String,
        required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    min: [4, 'The password must have at least 4 characters.'],
    max: [32, 'The username can\'t have  more than 32 characters.']
  },
    rentals: [
      {type: Schema.Types.ObjectId, ref: 'Rental'}
  ]
});

module.exports = mongoose.model('User', userSchema);
