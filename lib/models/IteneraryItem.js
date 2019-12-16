const mongoose = require('mongoose');
const { getWeather } = require('../services/weather');

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

  city: {
    type: String,
    required: true
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
    return this.date.getDate() + 1;
  });

iteneraryItemSchema.virtual('month')
  .get(function() {
    return this.date.getMonth() + 1;
  });

iteneraryItemSchema.virtual('year')
  .get(function() {
    return this.date.getFullYear();
  });

iteneraryItemSchema.statics.getItemWeather = function(id) {
  return getWeather(44418, this.date.year, this.date.month, this.date.day);
};


module.exports = mongoose.model('IteneraryItems', iteneraryItemSchema);
