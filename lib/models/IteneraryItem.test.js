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

  it('should throw and error if a date is not included', () => {
    const iteneraryItem = new IteneraryItem();
    const { errors } = iteneraryItem.validateSync();
    expect(errors.date.message).toEqual('Path `date` is required.');
  });

  it('should have a virtual to get the day of the item', () => {
    const iteneraryItem = new IteneraryItem({
      date: new Date('2019-10-11')
    });
    expect(iteneraryItem.day).toEqual(11);
  });

  it('should have a virtual to get the month of the item', () => {
    const iteneraryItem = new IteneraryItem({
      date: new Date('2019-10-11')
    });
    expect(iteneraryItem.month).toEqual(10);
  });

  it('should have a virtual to get the year of the item', () => {
    const iteneraryItem = new IteneraryItem({
      date: new Date('2019-10-11')
    });
    expect(iteneraryItem.year).toEqual(2019);
  });
  
  it('should return the weather for a particular item', () => {
    const iteneraryItem = new IteneraryItem({
      
      date: new Date('2019-10-11')
    });
    expect(iteneraryItem.year).toEqual(2019);
  });
});
