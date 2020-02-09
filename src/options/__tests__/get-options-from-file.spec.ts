import fs, { Stats } from 'fs';
import path from 'path';

import getOptionsFromFile from '../get-options-from-file';

describe('getting options from file', () => {
  const statSpy = jest.spyOn(fs.promises, 'stat');
  const readFileSpy = jest.spyOn(fs.promises, 'readFile');

  afterEach(() => {
    statSpy.mockReset();
    readFileSpy.mockReset();
  });

  afterAll(() => {
    statSpy.mockRestore();
    readFileSpy.mockRestore();
  });

  test('should check if config file is in correct path', async () => {
    const cwdSpy = jest.spyOn(process, 'cwd');
    const joinSpy = jest.spyOn(path, 'join');

    cwdSpy.mockReturnValue('cwd-path');
    joinSpy.mockReturnValue('config-file-path');
    statSpy.mockImplementation(() => {
      throw new Error();
    });

    await getOptionsFromFile();

    expect(joinSpy).toHaveBeenCalledWith('cwd-path', '.filenamelintrc');
    expect(statSpy).toHaveBeenCalledWith('config-file-path');

    cwdSpy.mockRestore();
    joinSpy.mockRestore();
  });

  test('should return empty object when config file does not exist', async () => {
    statSpy.mockImplementation(() => {
      throw new Error();
    });

    expect(await getOptionsFromFile()).toEqual({});
  });

  test('should return empty object when config file is empty', async () => {
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');

    statSpy.mockResolvedValue((true as unknown) as Stats);
    readFileSpy.mockResolvedValue('');

    expect(await getOptionsFromFile()).toEqual({});
  });

  test('should return options', async () => {
    const options = { foo: 'bar' };

    statSpy.mockResolvedValue((true as unknown) as Stats);
    readFileSpy.mockResolvedValue(JSON.stringify(options));

    expect(await getOptionsFromFile()).toEqual(options);
  });

  test('should throw error when config file content is incorrect', async () => {
    statSpy.mockResolvedValue((true as unknown) as Stats);
    readFileSpy.mockResolvedValue('invalid json');

    await expect(getOptionsFromFile()).rejects.toThrow(/.filenamelintrc file has incorrect format./);
  });
});
