jest.mock('fast-glob');

import glob from 'fast-glob';

import main, { ERROR_CODE, SUCCESS_CODE } from '../main';

const mockedGlob = (glob as unknown) as jest.Mock<Promise<string[]>>;

test('should call glob with correct arguments', async () => {
  mockedGlob.mockReturnValue(Promise.resolve([]));

  await main();

  expect(glob).toHaveBeenCalledTimes(ERROR_CODE);
  expect(glob).toHaveBeenCalledWith('**/*', {
    ignore: ['node_modules', 'README.md', 'CHANGELOG.md', 'LICENSE'],
  });
});

test('should return success code when there are no any files', async () => {
  mockedGlob.mockReturnValue(Promise.resolve([]));

  expect(await main()).toEqual(SUCCESS_CODE);
});

test('should return error code when glob throws', async () => {
  mockedGlob.mockReturnValue(Promise.reject(new Error()));

  expect(await main()).toEqual(ERROR_CODE);
});

test('should return success code when all filenames are valid', async () => {
  mockedGlob.mockReturnValue(Promise.resolve(['index.js', 'index.css']));

  expect(await main()).toEqual(SUCCESS_CODE);
});

test('should return error code when some filenames are invalid', async () => {
  mockedGlob.mockReturnValue(Promise.resolve(['camelCase.js', 'PascalCase.js', 'index.css']));

  expect(await main()).toEqual(ERROR_CODE);
});
