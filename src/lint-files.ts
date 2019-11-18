import path from 'path';
import kebabCase from 'kebab-case';

function lintFile(file: string): string {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = kebabCase(basename) === basename;

  return isValid ? '' : `${file} has wrong name.`;
}

export default function lintFiles(files: string[]): string[] {
  return files.flatMap(file => {
    const lintResult = lintFile(file);
    return lintResult ? [lintResult] : [];
  });
}
