import { Formats } from '../options';
import lintFile from './lint-file';

interface LintingErrorEntry {
  file: string;
  error: string;
}

export default function lintFiles(files: string[], format: Formats): LintingErrorEntry[] {
  return files.flatMap(file => {
    const error = lintFile(file, format);
    return error === null ? [] : [{ file, error }];
  });
}
