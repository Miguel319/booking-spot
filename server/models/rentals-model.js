const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: { type: String, required: true, max: [120, 'The title can\'t have more than 120 characters.'] },
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true, min: [4, 'The street must have at least 4 characters.'] },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    shared: { type: Boolean, required: true },
    description: { type: String, required: true, min: [4, 'The description must have at least 4 characters.'] },
    dailyRate: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rental', rentalSchema);