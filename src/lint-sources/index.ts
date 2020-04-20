import { Formats } from '../options';
import lintFile from './lint-file';

export default function lintSources(sources: { files: string[]; format: Formats }[]): Map<string, string> {
  return sources.reduce((acc, { files, format }) => {
    files.forEach((file) => {
      const error = lintFile(file, format);

      if (error) {
        acc.set(file, error);
      } else {
        acc.delete(file);
      }
    });
    return acc;
  }, new Map());
}
