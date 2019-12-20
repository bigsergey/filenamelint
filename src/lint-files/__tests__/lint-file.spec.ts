jest.mock('../validate-string');

import validate from '../validate-string';
import lintFile from '../lint-file';
import { Formats } from '../../get-options';

const mockedValidate = (validate as unknown) as jest.Mock<boolean>;

describe('lint file', () => {
  it('should lint only path basename without extension', () => {
    const file = 'path/to/file/name.js';

    lintFile(file, Formats.kebabCase);

    expect(mockedValidate).toHaveBeenCalledWith('name', Formats.kebabCase);
  });

  it('should return null for correct filename', () => {
    const file = 'path/to/file/name.js';

    mockedValidate.mockReturnValue(true);

    expect(lintFile(file, Formats.kebabCase)).toEqual(null);
  });

  it('should return error message for incorrect filename', () => {
    const file = 'path/to/file/name.js';

    mockedValidate.mockReturnValue(false);
    const validationResult = lintFile(file, Formats.kebabCase);

    expect(validationResult).toMatch(/file/);
    expect(validationResult).toMatch(/has wrong name/);
  });
});
