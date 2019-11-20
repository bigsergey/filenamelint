jest.mock('fast-glob');
jest.mock('../lint-files');

import glob from 'fast-glob';

import lintFiles from '../lint-files';
import main, { ERROR_CODE, SUCCESS_CODE } from '../main';

const mockedGlob = (glob as unknown) as jest.Mock<Promise<string[]>>;
const mockedLintFiles = (lintFiles as unknown) as jest.Mock<string[]>;

afterEach(() => {
  mockedGlob.mockRestore();
  mockedLintFiles.mockRestore();
});

test('should call glob with correct arguments', async () => {
  mockedGlob.mockReturnValue(Promise.resolve([]));

  await main();

  expect(glob).toHaveBeenCalledTimes(1);
  expect(glob).toHaveBeenCalledWith('**/*', {
    ignore: ['node_modules', 'README.md', 'CHANGELOG.md', 'LICENSE'],
  });
});

test('should return success code when there are no any files', async () => {
  mockedGlob.mockReturnValue(Promise.resolve([]));
  mockedLintFiles.mockReturnValue([]);

  expect(await main()).toEqual(SUCCESS_CODE);
});

test('should return error code when glob throws', async () => {
  mockedGlob.mockReturnValue(Promise.reject(new Error()));

  expect(await main()).toEqual(ERROR_CODE);
});

test('should return success code when all filenames are valid', async () => {
  const files = ['index.js', 'index.css'];
  mockedGlob.mockReturnValue(Promise.resolve(files));
  mockedLintFiles.mockReturnValue([]);

  const code = await main();

  expect(mockedLintFiles).toHaveBeenCalledTimes(1);
  expect(mockedLintFiles).toHaveBeenCalledWith(files);
  expect(code).toEqual(SUCCESS_CODE);
});

test('should return error code when some filenames are invalid', async () => {
  const files = ['camelCase.js', 'PascalCase.js', 'index.css'];
  mockedGlob.mockReturnValue(Promise.resolve(files));
  mockedLintFiles.mockReturnValue(['camelCase.js']);

  const code = await main();

  expect(mockedLintFiles).toHaveBeenCalledTimes(1);
  expect(mockedLintFiles).toHaveBeenCalledWith(files);
  expect(code).toEqual(ERROR_CODE);
});
