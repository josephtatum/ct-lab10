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

  it('should be able to return all trips', () => {

    return request(app)
      .get('/api/v1/trips')
      .then(response => {
        response.body.forEach(trip => {
          expect(trip).toEqual({
            __v: 0,
            _id: expect.any(String),
            dateOfDeparture: expect.any(String),
            destination: expect.any(String),
            origin: expect.any(String),
            modeOfTransit: expect.any(String),
            dateOfReturn: expect.any(String)
          });
        });
      });
  });

  it('should be able to return get a trip by ID', () => {
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(response => {
        expect(response.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          dateOfDeparture: expect.any(String),
          dateOfReturn: expect.any(String),
          destination: 'Stockholm, Sweden',
          iteneraryItems: [
            {
              __v: 0,
              _id: expect.any(String),
              name: 'Cafe Saturnus',
              notes: 'eat a lot of cardamom rolls!',
              tripId: expect.any(String)
            }
          ],
          modeOfTransit: 'airplane',
          origin: 'Portland, OR, USA' });
      });
  });

  it('should be able to find and update a trip by ID', () => {
    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ destination: 'Oslo, Norway' })
      .then(response => {
        expect(response.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          dateOfDeparture: expect.any(String),
          destination: 'Oslo, Norway',
          origin: 'Portland, OR, USA',
          modeOfTransit: 'airplane',
          dateOfReturn: expect.any(String)
        });
      });
  });

  it('should be able to find and delete a trip by ID', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(response => {
        expect(response.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          dateOfDeparture: expect.any(String),
          destination: 'Stockholm, Sweden',
          origin: 'Portland, OR, USA',
          modeOfTransit: 'airplane',
          dateOfReturn: expect.any(String)
        })
      });
  });

});
