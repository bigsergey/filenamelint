import fs, { Stats } from 'fs';
import path from 'path';

import getOptionsFromFile from '../get-options-from-file';

describe('getting options from file', () => {
  test('should check if config file is in correct path', async () => {
    const cwdSpy = jest.spyOn(process, 'cwd');
    const joinSpy = jest.spyOn(path, 'join');
    const statSpy = jest.spyOn(fs.promises, 'stat');

    cwdSpy.mockReturnValue('cwd-path');
    joinSpy.mockReturnValue('config-file-path');
    statSpy.mockResolvedValue((false as unknown) as Stats);

    await getOptionsFromFile();

    expect(joinSpy).toHaveBeenCalledWith('cwd-path', '.filenamelintrc');
    expect(statSpy).toHaveBeenCalledWith('config-file-path');

    cwdSpy.mockRestore();
    joinSpy.mockRestore();
    statSpy.mockRestore();
  });

  test('should return empty object when config file does not exist', async () => {
    const statSpy = jest.spyOn(fs.promises, 'stat');

    statSpy.mockResolvedValue((false as unknown) as Stats);

    expect(await getOptionsFromFile()).toEqual({});

    statSpy.mockRestore();
  });

  test('should return empty object when config file is empty', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');

    existsSyncSpy.mockReturnValue(true);
    readFileSpy.mockResolvedValue('');

    expect(await getOptionsFromFile()).toEqual({});

    existsSyncSpy.mockRestore();
    readFileSpy.mockRestore();
  });

  test('should return options', async () => {
    const options = { foo: 'bar' };
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');

    existsSyncSpy.mockReturnValue(true);
    readFileSpy.mockResolvedValue(JSON.stringify(options));

    expect(await getOptionsFromFile()).toEqual(options);

    existsSyncSpy.mockRestore();
    readFileSpy.mockRestore();
  });
});
