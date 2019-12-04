jest.mock('fast-glob');
jest.mock('../lint-files');
jest.mock('../get-options');

import glob from 'fast-glob';

import lintFiles from '../lint-files';
import getOptions, { Formats } from '../get-options';
import main, { ExitCodes } from '../main';
import { Options } from '../get-options';

const mockedGlob = (glob as unknown) as jest.Mock<Promise<string[]>>;
const mockedLintFiles = (lintFiles as unknown) as jest.Mock<string[]>;
const mockedGetOptions = (getOptions as unknown) as jest.Mock<Options>;

const ignore = ['ignore'];
const format = Formats.kebabCase;
const mockedOptions = { ignore, format };

beforeEach(() => {
  mockedGetOptions.mockReturnValue(mockedOptions);
  mockedGlob.mockResolvedValue([]);
  mockedLintFiles.mockReturnValue([]);
});

afterEach(() => {
  mockedGetOptions.mockRestore();
  mockedGlob.mockRestore();
  mockedLintFiles.mockRestore();
});

test('should call glob with correct arguments', async () => {
  await main();

  expect(glob).toHaveBeenCalledTimes(1);
  expect(glob).toHaveBeenCalledWith('**/*', { ignore });
});

test('should return success code when there are no any files', async () => {
  expect(await main()).toEqual(ExitCodes.SuccessNoLintingErrors);
});

test('should return error code when glob throws', async () => {
  mockedGlob.mockRejectedValue(new Error('Test error'));

  expect(await main()).toEqual(ExitCodes.UnexpectedError);
});

test('should return success code when all filenames are valid', async () => {
  const files = ['index.js', 'index.css'];
  mockedGlob.mockResolvedValue(files);
  mockedLintFiles.mockReturnValue([]);

  const code = await main();

  expect(mockedLintFiles).toHaveBeenCalledTimes(1);
  expect(mockedLintFiles).toHaveBeenCalledWith(files, format);
  expect(code).toEqual(ExitCodes.SuccessNoLintingErrors);
});

test('should return error code when some filenames are invalid', async () => {
  const files = ['camelCase.js', 'PascalCase.js', 'index.css'];
  mockedGlob.mockResolvedValue(files);
  mockedLintFiles.mockReturnValue(['lint files error']);

  const code = await main();

  expect(mockedLintFiles).toHaveBeenCalledTimes(1);
  expect(mockedLintFiles).toHaveBeenCalledWith(files, format);
  expect(code).toEqual(ExitCodes.SuccessWithLintingErrors);
});
