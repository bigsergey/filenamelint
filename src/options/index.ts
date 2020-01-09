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
}

export const defaultOptions: Options = {
  ignore: ['node_modules/**', 'coverage/**', 'README.md', 'CHANGELOG.md', 'LICENSE'],
  format: Formats.kebabCase,
};

export default function getOptions({ ignore, format }: Partial<Options> = {}): Options {
  const optionsFromFile = getOptionsFromFile();

  return {
    ignore: ignore || optionsFromFile.ignore || defaultOptions.ignore,
    format: format || optionsFromFile.format || defaultOptions.format,
  };
}
