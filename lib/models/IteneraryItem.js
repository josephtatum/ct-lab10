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

iteneraryItemSchema.virtual('day')
  .get(function() {
    return this.date.getDate();
  });

iteneraryItemSchema.virtual('month')
  .get(function() {
    return this.date.getMonth();
  });

iteneraryItemSchema.virtual('year')
  .get(function() {
    return this.date.getFullYear();
  });

module.exports = mongoose.model('IteneraryItems', iteneraryItemSchema);
