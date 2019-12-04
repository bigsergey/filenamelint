import path from 'path';
import kebabCase from 'kebab-case';
import camelCase from 'camelcase';
import { snakeCase } from 'snake-case';

import { Formats } from './get-options';

function validate(string: string, format: Formats): string {
  switch (format) {
    case Formats.kebabCase:
      return kebabCase(string);
    case Formats.camelCase:
      return camelCase(string);
    case Formats.pascalCase:
      return camelCase(string, { pascalCase: true });
    case Formats.snakeCase:
      return snakeCase(string);
    default:
      throw new Error(`"${format}" is unsupported format.`);
  }
}

function lintFile(file: string, format: Formats): string {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = validate(basename, format) === basename;

  return isValid ? '' : `${file} has wrong name.`;
}

export default function lintFiles(files: string[], format: Formats): string[] {
  return files.flatMap(file => {
    const lintResult = lintFile(file, format);
    return lintResult ? [lintResult] : [];
  });
}
