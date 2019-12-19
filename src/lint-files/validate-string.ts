import kebabCase from 'kebab-case';
import camelCase from 'camelcase';
import { snakeCase } from 'snake-case';

import { Formats } from '../get-options';

const equals = (a: string) => (b: string): boolean => a === b;

export default function validate(string: string, format: Formats): boolean {
  const equalsToBase = equals(string);

  switch (format) {
    case Formats.kebabCase:
      return equalsToBase(kebabCase(string));
    case Formats.camelCase:
      return equalsToBase(camelCase(string));
    case Formats.pascalCase:
      return equalsToBase(camelCase(string, { pascalCase: true }));
    case Formats.snakeCase:
      return equalsToBase(snakeCase(string));
    default:
      throw new Error(`"${format}" is unsupported format.`);
  }
}
