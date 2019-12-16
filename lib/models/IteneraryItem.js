const mongoose = require('mongoose');

const iteneraryItemSchema = new mongoose.Schema({

  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },

  name: {
    type: String,
    required: true
  },

  address: {
    type: String
  },

  date: {
    type: Date,
    required: true
  },

  notes: {
    type: String
  }

});

module.exports = mongoose.model('IteneraryItems', iteneraryItemSchema);
