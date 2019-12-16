require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const IteneraryItem = require('../lib/models/IteneraryItem');

describe('itenerary item routes', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let iteneraryItem;
  beforeEach(async () => {

    trip = await Trip.create({
      origin: 'Portland, OR, USA',
      destination: 'Stockholm, Sweden',
      dateOfDeparture: new Date('2019-10-10'),
      dateOfReturn: new Date('2019-10-30'),
      modeOfTransit: 'airplane'
    });

    iteneraryItem = await IteneraryItem.create({
      tripId: trip._id,
      name: 'Cafe Saturnus',
      notes: 'eat a lot of cardamom rolls!',
      date: new Date('2019-10-11')
    });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should be able to create an itenerary item', () => {
    return request(app)
      .post('/api/v1/itenerary-items')
      .send({
        tripId: trip._id,
        name: 'Cafe Saturnus',
        notes: 'eat a lot of cardamom rolls!',
        date: new Date('2020-10-11')
      })
      .then(response => {
        expect(response.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Cafe Saturnus',
          notes: 'eat a lot of cardamom rolls!',
          tripId: expect.any(String),
          date: expect.any(String)
        });
      });
  });

  it('should be able to delete an itenerary item', () => {
    return request(app)
      .delete(`/api/v1/itenerary-items/${iteneraryItem._id}`)
      .then(response => {
        expect(response.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Cafe Saturnus',
          notes: 'eat a lot of cardamom rolls!',
          tripId: expect.any(String),
          date: expect.any(String)
        });
      });
  });

});
