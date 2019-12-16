const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({

  origin: {
    type: String,
    required: true
  },

  destination: {
    type: String,
    required: true
  },

  dateOfDeparture: {
    type: Date,
    required: true
  },

  dateOfReturn: {
    type: Date,
    required: true
  },

  modeOfTransit: {
    type: String,
    enum: ['train', 'car', 'airplane']
  }

}, {
  id: false,
  toJSON: { virtuals: true }
});

tripSchema.virtual('iteneraryItem', {
  ref: 'IteneraryItem',
  localField: '_id',
  foreignField: 'tripId'
});

module.exports = mongoose.model('Trip', tripSchema);
