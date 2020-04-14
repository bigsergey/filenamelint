import path from 'path';
import chalk from 'chalk';

import { Formats } from '../options';
import validate from './validate-string';

export default function lintFile(file: string, format: Formats): string | null {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = validate(basename, format);

  return isValid ? null : `${chalk.yellow(file)} has wrong name ('${format}' is expected).`;
}
