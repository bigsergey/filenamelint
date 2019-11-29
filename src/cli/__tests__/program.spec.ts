jest.mock('commander', () => ({
  version: jest.fn(),
  option: jest.fn(),
  parse: jest.fn(),
}));

import commander, { Command } from 'commander';
import programOptions from '../program';
import collect from '../collect';

const mockedCommanderOption = (commander.option as unknown) as jest.Mock<Command['option']>;

test('should export correct option object', () => {
  expect(programOptions).toEqual({ ignore: undefined });
});

test('should set version', () => {
  expect(commander.version).toHaveBeenCalledWith('0.3.0');
});

test('should define --ignore-pattern flag', () => {
  const [name, description, processingFunction] = mockedCommanderOption.mock.calls[0];

  expect(name).toContain('--ignore-pattern');
  expect(typeof description).toBe('string');
  expect(processingFunction).toBe(collect);
  expect(mockedCommanderOption).toHaveBeenCalledTimes(1);
});

test('should parse process arguments', () => {
  expect(commander.parse).toHaveBeenCalledTimes(1);
});
