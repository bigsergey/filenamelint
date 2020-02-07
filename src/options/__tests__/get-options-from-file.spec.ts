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
    statSpy.mockImplementation(() => {
      throw new Error();
    });

    await getOptionsFromFile();

    expect(joinSpy).toHaveBeenCalledWith('cwd-path', '.filenamelintrc');
    expect(statSpy).toHaveBeenCalledWith('config-file-path');

    cwdSpy.mockRestore();
    joinSpy.mockRestore();
    statSpy.mockRestore();
  });

  test('should return empty object when config file does not exist', async () => {
    const statSpy = jest.spyOn(fs.promises, 'stat');

    statSpy.mockImplementation(() => {
      throw new Error();
    });

    expect(await getOptionsFromFile()).toEqual({});

    statSpy.mockRestore();
  });

  test('should return empty object when config file is empty', async () => {
    const statSpy = jest.spyOn(fs.promises, 'stat');
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');

    statSpy.mockResolvedValue((true as unknown) as Stats);
    readFileSpy.mockResolvedValue('');

    expect(await getOptionsFromFile()).toEqual({});

    statSpy.mockRestore();
    readFileSpy.mockRestore();
  });

  test('should return options', async () => {
    const options = { foo: 'bar' };
    const statSpy = jest.spyOn(fs.promises, 'stat');
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');

    statSpy.mockResolvedValue((true as unknown) as Stats);
    readFileSpy.mockResolvedValue(JSON.stringify(options));

    expect(await getOptionsFromFile()).toEqual(options);

    statSpy.mockRestore();
    readFileSpy.mockRestore();
  });
});
