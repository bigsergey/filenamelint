jest.mock('../lint-files');

import { Formats } from '../../options';
import lintFiles, { LintingError } from '../lint-files';
import lintSources from '../index';

const mockedLintFiles = (lintFiles as unknown) as jest.Mock<LintingError[]>;

describe('lint sources', () => {
  afterEach(() => {
    mockedLintFiles.mockRestore();
  });

  test('should return empty map for empty input', () => {
    expect(lintSources([])).toEqual(new Map());
    expect(mockedLintFiles).toHaveBeenCalledTimes(0);
  });

  test('should return empty map when filenames are correct', () => {
    mockedLintFiles.mockReturnValue([]);
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
    expect(mockedLintFiles).toHaveBeenCalledTimes(2);
    expect(mockedLintFiles.mock.calls[0][0]).toEqual(sources[0]);
    expect(mockedLintFiles.mock.calls[1][0]).toEqual(sources[1]);
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

    mockedLintFiles
      .mockReturnValueOnce([
        {
          file: 'first',
          error: 'first filename error',
        },
      ])
      .mockReturnValueOnce([
        {
          file: 'third',
          error: 'third filename error',
        },
      ]);

    expect(lintSources(sources)).toEqual(
      new Map([
        ['first', 'first filename error'],
        ['third', 'third filename error'],
      ]),
    );
    expect(mockedLintFiles).toHaveBeenCalledTimes(2);
    expect(mockedLintFiles.mock.calls[0][0]).toEqual(sources[0]);
    expect(mockedLintFiles.mock.calls[1][0]).toEqual(sources[1]);
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

    mockedLintFiles
      .mockReturnValueOnce([
        {
          file: 'first',
          error: 'first filename error',
        },
      ])
      .mockReturnValueOnce([
        {
          file: 'first',
          error: 'first filename overridden error',
        },
      ]);

    expect(lintSources(sources)).toEqual(new Map([['first', 'first filename overridden error']]));
    expect(mockedLintFiles).toHaveBeenCalledTimes(2);
    expect(mockedLintFiles.mock.calls[0][0]).toEqual(sources[0]);
    expect(mockedLintFiles.mock.calls[1][0]).toEqual(sources[1]);
  });
});
