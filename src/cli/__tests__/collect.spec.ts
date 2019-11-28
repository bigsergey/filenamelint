import collect from '../collect';

test('should push value to the array', () => {
  expect(collect(1, [])).toEqual([1]);
});

test('should push value to end of the array', () => {
  expect(collect(2, [1])).toEqual([1, 2]);
});
