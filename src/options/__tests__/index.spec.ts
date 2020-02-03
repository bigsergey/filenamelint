jest.mock('../get-options-from-file');

import getOptions, { defaultOptions, Formats, Options } from '../index';
import getOptionsFromFile from '../get-options-from-file';

describe('getting options', () => {
  const mockedGetOptionsFromFile = (getOptionsFromFile as unknown) as jest.Mock<Partial<Options>>;

  afterEach(() => {
    mockedGetOptionsFromFile.mockRestore();
  });

  describe('default options', () => {
    beforeEach(() => {
      mockedGetOptionsFromFile.mockReturnValue({});
    });

    test('should return default options when custom options are empty', () => {
      expect(getOptions()).toEqual(defaultOptions);
    });

    test('should return default ignore option when all options are undefined', () => {
      expect(getOptions({ ignore: undefined, format: undefined })).toEqual(defaultOptions);
    });
  });

  describe('non default config', () => {
    describe('custom options from cli', () => {
      beforeEach(() => {
        mockedGetOptionsFromFile.mockReturnValue({});
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

    describe('custom options from config file', () => {
      test('should rewrite default ignore option with custom one from config file', () => {
        const ignore = ['ignore-from-config-file'];
        mockedGetOptionsFromFile.mockReturnValue({ ignore });

        expect(getOptions()).toHaveProperty('ignore', ignore);
        expect(mockedGetOptionsFromFile).toHaveBeenCalledTimes(1);
      });

      test('should rewrite default format option with custom one from config file', () => {
        mockedGetOptionsFromFile.mockReturnValue({ format: Formats.snakeCase });

        expect(getOptions()).toHaveProperty('format', Formats.snakeCase);
      });

      test('should rewrite default and config file ignore option with custom one', () => {
        const ignore = ['custom', 'ignore'];
        mockedGetOptionsFromFile.mockReturnValue({ ignore: ['ignore-from-config-file'] });

        expect(getOptions({ ignore })).toHaveProperty('ignore', ignore);
      });

      test('should rewrite default and config file format option with custom one', () => {
        mockedGetOptionsFromFile.mockReturnValue({ format: Formats.pascalCase });

        expect(getOptions({ format: Formats.snakeCase })).toHaveProperty('format', Formats.snakeCase);
      });
    });
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
