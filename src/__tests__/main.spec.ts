jest.mock('../options');
jest.mock('../get-sources');
jest.mock('../lint-sources');

import getOptions, { Formats, Options } from '../options';
import getSources from '../get-sources';
import lintSources from '../lint-sources';
import main, { ExitCodes } from '../main';

describe('main', () => {
  const mockedGetOptions = (getOptions as unknown) as jest.Mock<Promise<Options>>;
  const mockedGetSources = (getSources as unknown) as jest.Mock<Promise<{}[]>>;
  const mockedLintSources = (lintSources as unknown) as jest.Mock<Map<string, string>>;
  const errorLogSpy = jest.spyOn(console, 'error');

  const ignore = ['ignore'];
  const format = Formats.kebabCase;
  const mockedOptions = { ignore, format, overrides: [] };

  beforeEach(() => {
    mockedGetOptions.mockResolvedValue(mockedOptions);
    mockedGetSources.mockResolvedValue([]);
    mockedLintSources.mockReturnValue(new Map());
  });

  afterEach(() => {
    errorLogSpy.mockReset();
    mockedGetOptions.mockRestore();
    mockedGetSources.mockRestore();
    mockedLintSources.mockRestore();
  });

  afterAll(() => {
    errorLogSpy.mockRestore();
  });

  test('should return success code when there are no any files', async () => {
    expect(await main()).toEqual(ExitCodes.SuccessNoLintingErrors);
    expect(errorLogSpy).toHaveBeenCalledTimes(0);
  });

  test('should return error code when getOptions throws', async () => {
    const error = new Error('getOptions error');
    mockedGetOptions.mockRejectedValue(error);

    expect(await main()).toEqual(ExitCodes.UnexpectedError);
    expect(errorLogSpy).toHaveBeenCalledTimes(1);
    expect(errorLogSpy).toHaveBeenCalledWith(error);
  });

  test('should return error code when getSources throws', async () => {
    const error = new Error('getSources error');
    mockedGetSources.mockRejectedValue(error);

    expect(await main()).toEqual(ExitCodes.UnexpectedError);
    expect(errorLogSpy).toHaveBeenCalledTimes(1);
    expect(errorLogSpy).toHaveBeenCalledWith(error);
  });

  test('should return error code when lintSources throws', async () => {
    const error = new Error('lintSources error');
    mockedLintSources.mockImplementation(
      (): Map<string, string> => {
        throw error;
      },
    );

    expect(await main()).toEqual(ExitCodes.UnexpectedError);
    expect(errorLogSpy).toHaveBeenCalledTimes(1);
    expect(errorLogSpy).toHaveBeenCalledWith(error);
  });

  test('should return success code when all filenames are valid', async () => {
    const initOptions = {} as Options;
    const options = {} as Options;
    const sources = [] as { files: []; format: Formats }[];
    mockedGetOptions.mockResolvedValue(options);
    mockedGetSources.mockResolvedValue(sources);
    mockedLintSources.mockReturnValue(new Map());

    const code = await main(initOptions);

    expect(mockedGetOptions).toHaveBeenCalledTimes(1);
    expect(mockedGetOptions).toHaveBeenCalledWith(initOptions);
    expect(mockedGetSources).toHaveBeenCalledTimes(1);
    expect(mockedGetSources).toHaveBeenCalledWith(options);
    expect(mockedLintSources).toHaveBeenCalledTimes(1);
    expect(mockedLintSources).toHaveBeenCalledWith(sources);
    expect(code).toEqual(ExitCodes.SuccessNoLintingErrors);
  });

  test('should return error code when some filenames are invalid', async () => {
    mockedGetOptions.mockResolvedValue({} as Options);
    mockedGetSources.mockResolvedValue([] as { files: []; format: Formats }[]);
    mockedLintSources.mockReturnValue(
      new Map([
        ['file', 'error'],
        ['file2', 'error2'],
      ]),
    );

    const code = await main();

    expect(errorLogSpy).toHaveBeenCalledTimes(2);
    expect(errorLogSpy).toHaveBeenNthCalledWith(1, 'error');
    expect(errorLogSpy).toHaveBeenNthCalledWith(2, 'error2');
    expect(code).toEqual(ExitCodes.SuccessWithLintingErrors);
  });
});
