import { ExitCodes } from '../../main';
import cli from './run-cli';

test('should return correct program version', async () => {
  const { code, stdout } = await cli(['--version'], 'src-mock');

  expect(stdout).toContain('0.3.0');
  expect(code).toBe(ExitCodes.SuccessNoLintingErrors);
});

test('should return success code for default ignore config', async () => {
  const { code, stdout } = await cli([], 'src-mock');

  expect(stdout).toEqual('');
  expect(code).toBe(ExitCodes.SuccessNoLintingErrors);
});

test('should return linting errors except LICENSE file', async () => {
  const { code, stderr } = await cli(['--ignore-pattern', 'LICENSE'], 'src-mock');

  expect(stderr).toContain('CHANGELOG.md has wrong name.');
  expect(stderr).toContain('README.md has wrong name.');
  expect(stderr).toContain('node_modules/wrongName.js has wrong name.');
  expect(stderr).not.toContain('LICENSE has wrong name.');
  expect(code).toBe(ExitCodes.SuccessWithLintingErrors);
});

test('should return linting errors except two patters', async () => {
  const { code, stderr } = await cli(
    ['--ignore-pattern', 'LICENSE', '--ignore-pattern', 'node_modules/**'],
    'src-mock',
  );

  expect(stderr).toContain('CHANGELOG.md has wrong name.');
  expect(stderr).toContain('README.md has wrong name.');
  expect(stderr).not.toContain('node_modules/wrongName.js has wrong name.');
  expect(stderr).not.toContain('LICENSE has wrong name.');
  expect(code).toBe(ExitCodes.SuccessWithLintingErrors);
});
