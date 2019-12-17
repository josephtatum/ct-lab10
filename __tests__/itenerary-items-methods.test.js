require('dotenv').config();

const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const IteneraryItem = require('../lib/models/IteneraryItem');
const Trip = require('../lib/models/Trip');

describe('Itenerary Item model', () => {

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
      dateOfDeparture: new Date('2019-10-10'),
      dateOfReturn: new Date('2019-10-30'),
      modeOfTransit: 'airplane'
    });

    iteneraryItem = await IteneraryItem.create({
      tripId: trip._id,
      name: 'Cafe Saturnus',
      notes: 'eat a lot of cardamom rolls!',
      date: new Date('2019-10-11'),
      latitude: 59.3293,
      longitude: 18.0686
    });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should be able to get the weather for a particular itenerary item', async() => {
    const woeid = await iteneraryItem.getItemWoeid();
    const weather = await iteneraryItem.getItemForecast(woeid, iteneraryItem.year, iteneraryItem.month, iteneraryItem.day);
    expect(weather).not.toEqual('undefined');
  });
});
