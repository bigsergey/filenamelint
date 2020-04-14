import { Formats } from '../options';
import lintFiles from './lint-files';

export default function lintSources(sources: { files: string[]; format: Formats }[]): Map<string, string> {
  return sources
    .map(lintFiles)
    .flat()
    .reduce((acc, { file, error }) => acc.set(file, error), new Map());
}
