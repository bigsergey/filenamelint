import { Formats } from '../get-options';
import lintFile from './lint-file';

export default function lintFiles(files: string[], format: Formats): string[] {
  return files.flatMap(file => {
    const lintResult = lintFile(file, format);
    return lintResult ? [lintResult] : [];
  });
}
