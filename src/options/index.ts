import { Overrides } from './overrides';
import getOptionsFromFile from './get-options-from-file';

export enum Formats {
  kebabCase = 'kebabCase',
  camelCase = 'camelCase',
  pascalCase = 'pascalCase',
  snakeCase = 'snakeCase',
}

export interface Options {
  ignore: string[];
  format: Formats;
  overrides: Overrides;
}

interface FilesConfig {
  files: string[];
}

export type Override = FilesConfig & Partial<Options>;

export interface Overrides {
  [index: number]: Override;
  length: number;
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
