import { Formats } from '../options';
import lintFile from './lint-file';

interface LintingErrorEntry {
  file: string;
  error: string;
}

export function lintFiles(files: string[], format: Formats): LintingErrorEntry[] {
  return files.flatMap(file => {
    const error = lintFile(file, format);
    return error === null ? [] : [{ file, error }];
  });
}

export default function lintSources(sources: { files: string[]; format: Formats }[]): Map<string, string> {
  return sources
    .map(({ files, format }) => {
      return lintFiles(files, format);
    })
    .flat()
    .reduce((acc, { file, error }) => acc.set(file, error), new Map());
}
