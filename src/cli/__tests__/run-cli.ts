import path from 'path';
import { exec } from 'child_process';

interface CLIRunResult {
  code: number;
  stdout: string;
  stderr: string;
}

export default function cli(args: string[]): Promise<CLIRunResult> {
  return new Promise(resolve => {
    const cliScript = path.resolve(__dirname, '..', 'index.ts');

    exec(`ts-node ${cliScript} ${args.join(' ')}`, { cwd: __dirname }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        stdout,
        stderr,
      });
    });
  });
}
