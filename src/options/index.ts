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

export default async function getOptions(cliOptions: Partial<Options> = {}): Promise<Options> {
  const optionsFromFile = await getOptionsFromFile();
  const globalIgnore = cliOptions.ignore || optionsFromFile.ignore || defaultOptions.ignore;
  const globalFormat = cliOptions.format || optionsFromFile.format || defaultOptions.format;

  return {
    ignore: globalIgnore,
    format: globalFormat,
  };
}
