import getOptions, { defaultOptions } from '../get-options';

test('should return default options when custom options are empty', () => {
  expect(getOptions()).toEqual(defaultOptions);
});

test('should return default ignore option when custom ignore option is undefined', () => {
  expect(getOptions({ ignore: undefined })).toEqual(defaultOptions);
});

test('should rewrite default ignore option with custom one', () => {
  const ignore = ['custom', 'ignore'];

  expect(getOptions({ ignore })).toHaveProperty('ignore', ignore);
});
