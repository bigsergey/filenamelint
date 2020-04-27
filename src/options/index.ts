import { Pattern } from 'fast-glob/out/types';

import getOptionsFromFile from './get-options-from-file';

export enum Formats {
  kebabCase = 'kebabCase',
  camelCase = 'camelCase',
  pascalCase = 'pascalCase',
  snakeCase = 'snakeCase',
}

export type Patterns = Pattern[];

type Override = {
  files: Pattern | Pattern[];
  ignore?: Patterns;
  format: Formats;
};

export type Overrides = Override[];

export interface Options {
  ignore: Patterns;
  format: Formats;
  overrides: Overrides;
}

export const defaultOptions: Options = {
  ignore: ['node_modules/**', 'coverage/**', 'README.md', 'CHANGELOG.md', 'LICENSE'],
  format: Formats.kebabCase,
  overrides: [],
};

export default async function getOptions(cliOptions: Partial<Options> = {}): Promise<Options> {
  const optionsFromFile = await getOptionsFromFile();

  return {
    ignore: cliOptions.ignore || optionsFromFile.ignore || defaultOptions.ignore,
    format: cliOptions.format || optionsFromFile.format || defaultOptions.format,
    overrides: optionsFromFile.overrides || defaultOptions.overrides,
  };
}
