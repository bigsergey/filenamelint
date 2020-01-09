import path from 'path';

import { Formats } from '../options';
import validate from './validate-string';

export default function lintFile(file: string, format: Formats): string | null {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = validate(basename, format);

  return isValid ? null : `${file} has wrong name.`;
}
