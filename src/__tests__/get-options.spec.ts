import { Formats } from '../get-options';
import getOptions, { defaultOptions } from '../get-options';

describe('getting options', () => {
  test('should return default options when custom options are empty', () => {
    expect(getOptions()).toEqual(defaultOptions);
  });

  test('should return default ignore option when all options are undefined', () => {
    expect(getOptions({ ignore: undefined, format: undefined })).toEqual(defaultOptions);
  });

  test('should rewrite default ignore option with custom one', () => {
    const ignore = ['custom', 'ignore'];

    expect(getOptions({ ignore })).toHaveProperty('ignore', ignore);
  });

  test('should rewrite default format option with custom one', () => {
    const format = Formats.snakeCase;

    expect(getOptions({ format })).toHaveProperty('format', format);
  });
});

describe('Formats enum', () => {
  test('should have correct formats', () => {
    expect(Formats.kebabCase).toEqual('kebabCase');
    expect(Formats.camelCase).toEqual('camelCase');
    expect(Formats.pascalCase).toEqual('pascalCase');
    expect(Formats.snakeCase).toEqual('snakeCase');
  });
});
