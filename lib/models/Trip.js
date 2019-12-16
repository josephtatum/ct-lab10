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

  dateofReturn: {
    type: Date,
    required: true,
  },

  modeOfTransit: {
    type: String,
    enum: ['train', 'car', 'airplane']
  }

});

module.exports = mongoose.model('Trip', tripSchema);
