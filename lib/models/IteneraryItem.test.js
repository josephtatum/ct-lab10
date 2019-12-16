const IteneraryItem = require('./IteneraryItem');

describe('Itenerary Item model', () => {

  it('should throw an error if a itenerary item name is not included', () => {
    const iteneraryItem = new IteneraryItem();
    const { errors } = iteneraryItem.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('should throw and error if a tripId is not included', () => {
    const iteneraryItem = new IteneraryItem();
    const { errors } = iteneraryItem.validateSync();
    expect(errors.tripId.message).toEqual('Path `tripId` is required.');
  });
  
});
