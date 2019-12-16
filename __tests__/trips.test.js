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

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let iteneraryItem;
  beforeEach(async() => {

    trip = await Trip.create({
      origin: 'Portland, OR, USA',
      destination: 'Stockholm, Sweden',
      dateOfDeparture: new Date('2020-10-10'),
      dateOfReturn: new Date('2020-10-30'),
      modeOfTransit: 'airplane'
    });

    iteneraryItem = await IteneraryItem.create({
      tripId: trip._id,
      name: 'Cafe Saturnus',
      notes: 'eat a lot of cardamom rolls!'
    });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should be able to create a trip', () => {
    return request(app)
      .post('/api/v1/trips/')
      .send({
        origin: 'Portland, OR, USA',
        destination: 'Stockholm, Sweden',
        dateOfDeparture: new Date('2020-10-10'),
        dateOfReturn: new Date('2020-10-30'),
        modeOfTransit: 'airplane'
      })
      .then(response => {
        expect(response.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          dateOfDeparture: expect.any(String),
          destination: 'Stockholm, Sweden',
          origin: 'Portland, OR, USA',
          modeOfTransit: 'airplane',
          dateOfReturn: expect.any(String)
        });
      });
  });
});
