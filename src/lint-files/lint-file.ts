import path from 'path';

import { Formats } from '../get-options';
import validate from './validate-string';

export default function lintFile(file: string, format: Formats): string {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = validate(basename, format);

  return isValid ? '' : `${file} has wrong name.`;
}
