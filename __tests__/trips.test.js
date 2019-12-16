require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const IteneraryItem = require('../lib/models/IteneraryItem');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  let trip;
  let iteneraryItem;
  beforeEach(() => {
    trip = new Trip({
      origin: 'Portland, OR, USA',
      destination: 'Stockholm, Sweden',
      dateOfDeparture: new Date('2020-10-10'),
      dateOfReturn: new Date('2020-10-30'),
      modeOfTransit: 'airplane'
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
});
