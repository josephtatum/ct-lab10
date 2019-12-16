const Trip = require('./Trip');

describe('Trip model', () => {

  it('should throw an error if a trip origin is not included', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    expect(errors.origin.message).toEqual('Path `origin` is required.');
  });

  it('should throw an error if a trip destination is not included', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    expect(errors.destination.message).toEqual('Path `destination` is required.');
  });

  it('should throw an error if a trip date of departure is not included', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    expect(errors.dateOfDeparture.message).toEqual('Path `dateOfDeparture` is required.');
  });

  it('should throw an error if a trip date of return is not included', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    expect(errors.dateOfReturn.message).toEqual('Path `dateOfReturn` is required.');
  });

  it('should throw an error if mode of transit is not train, car, or airplane', () => {
    const trip = new Trip({ modeOfTransit: 'scooter' });
    const { errors } = trip.validateSync();
    expect(errors.modeOfTransit.message).toEqual('`scooter` is not a valid enum value for path `modeOfTransit`.');
  });
});
