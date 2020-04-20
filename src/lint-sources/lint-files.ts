import { Patterns, Formats } from '../options';
import lintFile from './lint-file';

export interface LintingError {
  file: string;
  error: string;
}

export default function lintFiles({ files, format }: { files: Patterns; format: Formats }): LintingError[] {
  return files.flatMap((file) => {
    const error = lintFile(file, format);
    return error === null ? [] : [{ file, error }];
  });
}
