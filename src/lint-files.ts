import path from 'path';
import kebabCase from 'kebab-case';

import { Formats } from './get-options';

function getValidationFunction(format: Formats): KebabCaseFn {
  switch (format) {
    case Formats.kebabCase:
      return kebabCase;
    case Formats.camelCase:
      return kebabCase;
    case Formats.pascalCase:
      return kebabCase;
    case Formats.snakeCase:
      return kebabCase;
    default:
      throw new Error(`"${format}" is unsupported format.`);
  }
}

function lintFile(file: string, format: Formats): string {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const validationFunction = getValidationFunction(format);
  const isValid = validationFunction(basename) === basename;

  return isValid ? '' : `${file} has wrong name.`;
}

export default function lintFiles(files: string[], format: Formats): string[] {
  return files.flatMap(file => {
    const lintResult = lintFile(file, format);
    return lintResult ? [lintResult] : [];
  });
}
