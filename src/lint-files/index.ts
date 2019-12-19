import { Formats } from '../get-options';
import lintFile from './lint-file';

export default function lintFiles(files: string[], format: Formats): string[] {
  return files.flatMap(file => {
    const lintingError = lintFile(file, format);
    return lintingError === null ? [] : [lintingError];
  });
}
