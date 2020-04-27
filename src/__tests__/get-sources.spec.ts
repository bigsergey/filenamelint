jest.mock('fast-glob');

import glob from 'fast-glob';

import { Formats, Overrides, Patterns } from '../options/index';
import getSources from '../get-sources';

describe('getSources', () => {
  const mockedGlob = (glob as unknown) as jest.Mock<Promise<string[]>>;

  beforeEach(() => {
    mockedGlob.mockResolvedValue([]);
  });

  afterEach(() => {
    mockedGlob.mockRestore();
  });

  test('should return all files for main config', async () => {
    const format = 'format' as Formats;
    const ignore = [] as Patterns;
    const overrides = [] as Overrides;

    const sources = await getSources({ format, ignore, overrides });

    expect(glob).toHaveBeenCalledTimes(1);
    expect(glob).toHaveBeenCalledWith('**/*', { ignore });

    expect(sources).toEqual([
      {
        files: [],
        format,
      },
    ]);
  });

  test('should return files for main config and each override', async () => {
    mockedGlob
      .mockResolvedValueOnce(['1'])
      .mockResolvedValueOnce(['2'])
      .mockResolvedValueOnce(['3'])
      .mockResolvedValueOnce(['4']);

    const mainFormat = 'mainFormat' as Formats;
    const mainIgnore = ['main', 'ignore'];
    const overrides = ([
      {
        files: ['first', 'override'],
        ignore: ['first', 'ignore'],
      },
      {
        files: ['second', 'override'],
        ignore: ['second', 'ignore'],
        format: 'second override',
      },
      {
        files: ['third', 'override'],
        format: 'third override',
      },
    ] as unknown) as Overrides;

    const sources = await getSources({ format: mainFormat, ignore: mainIgnore, overrides });

    expect(glob).toHaveBeenCalledTimes(4);
    expect(glob).toHaveBeenNthCalledWith(1, '**/*', { ignore: mainIgnore });
    expect(glob).toHaveBeenNthCalledWith(2, overrides[0].files, { ignore: overrides[0].ignore });
    expect(glob).toHaveBeenNthCalledWith(3, overrides[1].files, { ignore: overrides[1].ignore });
    expect(glob).toHaveBeenNthCalledWith(4, overrides[2].files, { ignore: undefined });

    expect(sources[0]).toEqual({
      files: ['1'],
      format: mainFormat,
    });
    expect(sources[1]).toEqual({
      files: ['2'],
      format: mainFormat,
    });
    expect(sources[2]).toEqual({
      files: ['3'],
      format: 'second override',
    });
    expect(sources[3]).toEqual({
      files: ['4'],
      format: 'third override',
    });
  });
});
