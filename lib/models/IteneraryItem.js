const mongoose = require('mongoose');
const { getWoeid } = require('../services/woeid');
const { getForecast } = require('../services/weather');

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

  latitude: {
    type: Number,
    required: true
  },

  longitude: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  notes: {
    type: String
  },

  weather: {
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

iteneraryItemSchema.methods.getItemWoeid = function() {
  return getWoeid(this.latitude, this.longitude);
};

iteneraryItemSchema.methods.getItemForecast = function(woeid, year, month, date) {
  return getForecast(woeid, year, month, date);
};

module.exports = mongoose.model('IteneraryItems', iteneraryItemSchema);
