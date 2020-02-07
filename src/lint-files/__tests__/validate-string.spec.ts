jest.mock('kebab-case');
jest.mock('camelcase');
jest.mock('snake-case', () => ({
  snakeCase: jest.fn(),
}));

import kebabCase from 'kebab-case';
import camelCase from 'camelcase';
import { snakeCase } from 'snake-case';

import validate from '../validate-string';
import { Formats } from '../../options';

describe.skip('validate string', () => {
  const mockedKebabCase = (kebabCase as unknown) as jest.Mock<string>;
  const mockedCamelCase = (camelCase as unknown) as jest.Mock<string>;
  const mockedSnakeCase = (snakeCase as unknown) as jest.Mock<string>;

  afterEach(() => {
    mockedKebabCase.mockReset();
    mockedCamelCase.mockReset();
    mockedSnakeCase.mockReset();
  });

  it('should throw for unsupported format', () => {
    expect(() => validate('string', 'unknown' as Formats)).toThrowError(/"unknown" is unsupported format./);
  });

  describe('kebab case', () => {
    it('should do kebab case validation', () => {
      validate('string', Formats.kebabCase);

      expect(mockedKebabCase).toHaveBeenCalledTimes(1);
      expect(mockedKebabCase).toHaveBeenCalledWith('string');
    });

    it('should return true when base string and formatted string are equal', () => {
      mockedKebabCase.mockReturnValue('string');

      expect(validate('string', Formats.kebabCase)).toBeTruthy;
    });

    it('should return false when base string and formatted string are not equal', () => {
      mockedKebabCase.mockReturnValue('other');

      expect(validate('string', Formats.kebabCase)).toBeFalsy;
    });
  });

  describe('camel case', () => {
    it('should do camel case validation', () => {
      validate('string', Formats.camelCase);

      expect(mockedCamelCase).toHaveBeenCalledTimes(1);
      expect(mockedCamelCase).toHaveBeenCalledWith('string');
    });

    it('should return true when base string and formatted string are equal', () => {
      mockedCamelCase.mockReturnValue('string');

      expect(validate('string', Formats.camelCase)).toBeTruthy;
    });

    it('should return false when base string and formatted string are not equal', () => {
      mockedCamelCase.mockReturnValue('other');

      expect(validate('string', Formats.camelCase)).toBeFalsy;
    });
  });

  describe('pascal case', () => {
    it('should do pascal case validation', () => {
      validate('string', Formats.pascalCase);

      expect(mockedCamelCase).toHaveBeenCalledTimes(1);
      expect(mockedCamelCase).toHaveBeenCalledWith('string', { pascalCase: true });
    });

    it('should return true when base string and formatted string are equal', () => {
      mockedCamelCase.mockReturnValue('string');

      expect(validate('string', Formats.pascalCase)).toBeTruthy;
    });

    it('should return false when base string and formatted string are not equal', () => {
      mockedCamelCase.mockReturnValue('other');

      expect(validate('string', Formats.pascalCase)).toBeFalsy;
    });
  });

  describe('snake case', () => {
    it('should do snake case validation', () => {
      validate('string', Formats.snakeCase);

      expect(mockedSnakeCase).toHaveBeenCalledTimes(1);
      expect(mockedSnakeCase).toHaveBeenCalledWith('string');
    });

    it('should return true when base string and formatted string are equal', () => {
      mockedSnakeCase.mockReturnValue('string');

      expect(validate('string', Formats.snakeCase)).toBeTruthy;
    });

    it('should return false when base string and formatted string are not equal', () => {
      mockedSnakeCase.mockReturnValue('other');

      expect(validate('string', Formats.snakeCase)).toBeFalsy;
    });
  });
});
