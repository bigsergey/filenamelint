import collect from '../collect';

describe('collect', () => {
  test('should create value when previous value is undefined', () => {
    expect(collect('1')).toEqual(['1']);
  });

  test('should push value to empty the array', () => {
    expect(collect('1', [])).toEqual(['1']);
  });

  test('should push value to end of the array', () => {
    expect(collect('2', ['1'])).toEqual(['1', '2']);
  });
});
