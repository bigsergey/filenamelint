jest.mock('../get-options-from-file');

import getOptions, { defaultOptions, Formats, Options } from '../index';
import getOptionsFromFile from '../get-options-from-file';

describe.only('getting options', () => {
  const mockedGetOptionsFromFile = (getOptionsFromFile as unknown) as jest.Mock<Promise<Partial<Options>>>;

  afterEach(() => {
    mockedGetOptionsFromFile.mockRestore();
  });

  describe('default options', () => {
    beforeEach(async () => {
      await mockedGetOptionsFromFile.mockResolvedValue({});
    });

    test('should return default options when custom options are empty', async () => {
      expect(await getOptions()).toEqual(defaultOptions);
    });

    test('should return default ignore option when all options are undefined', async () => {
      expect(await getOptions({ ignore: undefined, format: undefined })).toEqual(defaultOptions);
    });
  });

  describe('non default config', () => {
    describe('custom options from cli', () => {
      beforeEach(async () => {
        await mockedGetOptionsFromFile.mockResolvedValue({});
      });

      test('should rewrite default ignore option with custom one', async () => {
        const ignore = ['custom', 'ignore'];

        expect(await getOptions({ ignore })).toHaveProperty('ignore', ignore);
      });

      test('should rewrite default format option with custom one', async () => {
        const format = Formats.snakeCase;

        expect(await getOptions({ format })).toHaveProperty('format', format);
      });
    });

    describe('custom options from config file', () => {
      test('should rewrite default ignore option with custom one from config file', async () => {
        const ignore = ['ignore-from-config-file'];
        await mockedGetOptionsFromFile.mockResolvedValue({ ignore });

        expect(await getOptions()).toHaveProperty('ignore', ignore);
        expect(mockedGetOptionsFromFile).toHaveBeenCalledTimes(1);
      });

      test('should rewrite default format option with custom one from config file', async () => {
        await mockedGetOptionsFromFile.mockResolvedValue({ format: Formats.snakeCase });

        expect(await getOptions()).toHaveProperty('format', Formats.snakeCase);
      });

      test('should rewrite default and config file ignore option with custom one', async () => {
        const ignore = ['custom', 'ignore'];
        await mockedGetOptionsFromFile.mockResolvedValue({ ignore: ['ignore-from-config-file'] });

        expect(await getOptions({ ignore })).toHaveProperty('ignore', ignore);
      });

      test('should rewrite default and config file format option with custom one', async () => {
        await mockedGetOptionsFromFile.mockResolvedValue({ format: Formats.pascalCase });

        expect(await getOptions({ format: Formats.snakeCase })).toHaveProperty('format', Formats.snakeCase);
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
