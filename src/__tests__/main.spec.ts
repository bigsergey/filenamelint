jest.mock('fast-glob');
jest.mock('../lint-files');

import glob from 'fast-glob';

import lintFiles from '../lint-files';
import main, { ExitCodes } from '../main';
import { defaultOptions } from '../get-options';

const mockedGlob = (glob as unknown) as jest.Mock<Promise<string[]>>;
const mockedLintFiles = (lintFiles as unknown) as jest.Mock<string[]>;

afterEach(() => {
  mockedGlob.mockRestore();
  mockedLintFiles.mockRestore();
});

test('should call glob with correct arguments', async () => {
  mockedGlob.mockResolvedValue([]);

  await main();

  expect(glob).toHaveBeenCalledTimes(1);
  expect(glob).toHaveBeenCalledWith('**/*', defaultOptions);
});

test('should return success code when there are no any files', async () => {
  mockedGlob.mockResolvedValue([]);
  mockedLintFiles.mockReturnValue([]);

  expect(await main()).toEqual(ExitCodes.SuccessNoLintingErrors);
});

test('should return error code when glob throws', async () => {
  mockedGlob.mockRejectedValue(new Error());

  expect(await main()).toEqual(ExitCodes.UnexpectedError);
});

test('should return success code when all filenames are valid', async () => {
  const files = ['index.js', 'index.css'];
  mockedGlob.mockResolvedValue(files);
  mockedLintFiles.mockReturnValue([]);

  const code = await main();

  expect(mockedLintFiles).toHaveBeenCalledTimes(1);
  expect(mockedLintFiles).toHaveBeenCalledWith(files);
  expect(code).toEqual(ExitCodes.SuccessNoLintingErrors);
});

test('should return error code when some filenames are invalid', async () => {
  const files = ['camelCase.js', 'PascalCase.js', 'index.css'];
  mockedGlob.mockResolvedValue(files);
  mockedLintFiles.mockReturnValue(['camelCase.js']);

  const code = await main();

  expect(mockedLintFiles).toHaveBeenCalledTimes(1);
  expect(mockedLintFiles).toHaveBeenCalledWith(files);
  expect(code).toEqual(ExitCodes.SuccessWithLintingErrors);
});
