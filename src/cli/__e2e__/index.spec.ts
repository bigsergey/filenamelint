import { ExitCodes } from '../../main';
import cli from './run-cli';

describe('cli', () => {
  test('should return correct program version', async () => {
    const { code, stdout } = await cli(['--version'], 'src-mock');

    expect(stdout).toContain('0.5.0');
    expect(code).toBe(ExitCodes.SuccessNoLintingErrors);
  });

  test('should return success code for default ignore config', async () => {
    const { code, stdout } = await cli([], 'src-mock');

    expect(stdout).toEqual('');
    expect(code).toBe(ExitCodes.SuccessNoLintingErrors);
  });

  test('should return linting errors except LICENSE file', async () => {
    const { code, stderr } = await cli(['--ignore-pattern', 'LICENSE'], 'src-mock');

    expect(stderr).toContain('CHANGELOG.md');
    expect(stderr).toContain('README.md');
    expect(stderr).toContain('node_modules/wrongName.js');
    expect(stderr).not.toContain('LICENSE');
    expect(code).toBe(ExitCodes.SuccessWithLintingErrors);
  });

  test('should return linting errors except two patters', async () => {
    const { code, stderr } = await cli(
      ['--ignore-pattern', 'LICENSE', '--ignore-pattern', 'node_modules/**'],
      'src-mock',
    );

    expect(stderr).toContain('CHANGELOG.md');
    expect(stderr).toContain('README.md');
    expect(stderr).not.toContain('node_modules/wrongName.js');
    expect(stderr).not.toContain('LICENSE');
    expect(code).toBe(ExitCodes.SuccessWithLintingErrors);
  });

  test('should use config from `.filenamelintrc` file', async () => {
    const { code, stderr } = await cli([], 'src-mock-with-config-file');

    expect(stderr).toContain('kebab-case.js');
    expect(code).toBe(ExitCodes.SuccessWithLintingErrors);
  });

  describe('overrides', () => {
    test('should apply overrides to appropriate folders', async () => {
      const { code, stderr } = await cli([], 'src-mock-with-overrides');

      expect(stderr).toContain('kebab-case.js');
      expect(stderr).not.toContain('camelFile.js');
      expect(stderr).not.toContain('kebab-file.js');
      expect(stderr).not.toContain('PascalFile.js');
      expect(stderr).not.toContain('snake_file.js');
      expect(code).toBe(ExitCodes.SuccessWithLintingErrors);
    });
  });
});
