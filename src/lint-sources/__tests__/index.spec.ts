jest.mock('../lint-file');

import { Formats } from '../../options';
import lintFile from '../lint-file';
import lintSources from '../index';

const mockedLintFile = (lintFile as unknown) as jest.Mock<string | null>;

describe('lint sources', () => {
  afterEach(() => {
    mockedLintFile.mockRestore();
  });

  test('should return empty map for empty input', () => {
    expect(lintSources([])).toEqual(new Map());
    expect(mockedLintFile).toHaveBeenCalledTimes(0);
  });

  test('should return empty map when filenames are correct', () => {
    mockedLintFile.mockReturnValue(null);
    const sources = [
      {
        files: ['first'],
        format: Formats.camelCase,
      },
      {
        files: ['second', 'third'],
        format: Formats.kebabCase,
      },
    ];

    expect(lintSources(sources)).toEqual(new Map());
    expect(mockedLintFile).toHaveBeenCalledTimes(3);
    expect(mockedLintFile).toHaveBeenNthCalledWith(1, 'first', Formats.camelCase);
    expect(mockedLintFile).toHaveBeenNthCalledWith(2, 'second', Formats.kebabCase);
    expect(mockedLintFile).toHaveBeenNthCalledWith(3, 'third', Formats.kebabCase);
  });

  test('should return map with errors', () => {
    const sources = [
      {
        files: ['first'],
        format: Formats.camelCase,
      },
      {
        files: ['second', 'third'],
        format: Formats.kebabCase,
      },
    ];

    mockedLintFile
      .mockReturnValueOnce('first filename error')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('third filename error');

    expect(lintSources(sources)).toEqual(
      new Map([
        ['first', 'first filename error'],
        ['third', 'third filename error'],
      ]),
    );
    expect(mockedLintFile).toHaveBeenCalledTimes(3);
  });

  test('should return error from last override for same file', () => {
    const sources = [
      {
        files: ['first'],
        format: Formats.camelCase,
      },
      {
        files: ['first', 'first'],
        format: Formats.kebabCase,
      },
    ];

    mockedLintFile
      .mockReturnValueOnce('first filename error')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('first filename overridden error');

    expect(lintSources(sources)).toEqual(new Map([['first', 'first filename overridden error']]));
    expect(mockedLintFile).toHaveBeenCalledTimes(3);
  });

  test('should return no error when last override does not return error', () => {
    const sources = [
      {
        files: ['first'],
        format: Formats.camelCase,
      },
      {
        files: ['first'],
        format: Formats.kebabCase,
      },
    ];

    mockedLintFile.mockReturnValueOnce('first filename error').mockReturnValueOnce(null);

    expect(lintSources(sources)).toEqual(new Map());
    expect(mockedLintFile).toHaveBeenCalledTimes(2);
  });
});
