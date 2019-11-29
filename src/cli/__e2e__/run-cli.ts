import path from 'path';
import { exec } from 'child_process';

interface CLIRunResult {
  code: number;
  stdout: string;
  stderr: string;
}

export default function cli(args: string[], cwd = ''): Promise<CLIRunResult> {
  return new Promise(resolve => {
    const cliScript = path.resolve(__dirname, '..', 'index.ts');
    const cwdPath = path.join(__dirname, cwd);

    exec(`ts-node ${cliScript} ${args.join(' ')}`, { cwd: cwdPath }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        stdout,
        stderr,
      });
    });
  });
}
