import fs from 'fs';
import path from 'path';

import getOptionsFromFile from '../get-options-from-file';

describe('getting options from file', () => {
  test('should check if config file is in correct path', () => {
    const cwdSpy = jest.spyOn(process, 'cwd');
    const joinSpy = jest.spyOn(path, 'join');
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');

    cwdSpy.mockReturnValue('cwd-path');
    joinSpy.mockReturnValue('config-file-path');

    getOptionsFromFile();

    expect(joinSpy).toHaveBeenCalledWith('cwd-path', '.filenamelintrc');
    expect(existsSyncSpy).toHaveBeenCalledWith('config-file-path');

    cwdSpy.mockRestore();
    joinSpy.mockRestore();
    existsSyncSpy.mockRestore();
  });

  test('should return empty object when config file does not exist', () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');

    existsSyncSpy.mockReturnValue(false);

    expect(getOptionsFromFile()).toEqual({});

    existsSyncSpy.mockRestore();
  });

  test('should return empty object when config file is empty', () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync');

    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue('');

    expect(getOptionsFromFile()).toEqual({});

    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });

  test('should return options', () => {
    const options = { foo: 'bar' };
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync');

    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(JSON.stringify(options));

    expect(getOptionsFromFile()).toEqual(options);

    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });
});
