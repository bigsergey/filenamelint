jest.mock('../lint-file');

import lintFile from '../lint-file';
import lintFiles from '../index';
import { Formats } from '../../get-options';

const mockedLintFile = (lintFile as unknown) as jest.Mock<string | null>;

describe('lint files', () => {
  afterEach(() => {
    mockedLintFile.mockClear();
  });

  test('should return empty array for empty input', () => {
    expect(lintFiles([], Formats.camelCase)).toEqual([]);
    expect(mockedLintFile).toHaveBeenCalledTimes(0);
  });

  test('should call lintFile twice with correct arguments', () => {
    const files = ['first', 'second'];
    const format = Formats.camelCase;

    lintFiles(files, format);

    expect(mockedLintFile).toHaveBeenNthCalledWith(1, files[0], format);
    expect(mockedLintFile).toHaveBeenNthCalledWith(2, files[1], format);
  });

  test('should return empty array when all filenames are correct', () => {
    mockedLintFile.mockReturnValue(null);
    const files = ['first', 'second'];
    const format = Formats.camelCase;

    expect(lintFiles(files, format)).toEqual([]);
  });

  test('should return array with error messages', () => {
    mockedLintFile.mockReturnValue('error');
    const files = ['first', 'second'];
    const format = Formats.camelCase;

    expect(lintFiles(files, format)).toEqual(['error', 'error']);
  });
});
