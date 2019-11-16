import path from 'path';
import kebabCase from 'kebab-case';

function lintFile(file: string): string | undefined {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = kebabCase(basename) === basename;

  return isValid ? undefined : `${file} has wrong name.`;
}

export default function lintFiles(files: string[]): string[] {
  return files.reduce((acc: string[], file: string): string[] => {
    const lintResult: string | undefined = lintFile(file);
    return lintResult ? acc.concat(lintResult) : acc;
  }, []);
}
