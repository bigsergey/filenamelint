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

export const defaultOptions = {
  ignore: ['node_modules/**', 'README.md', 'CHANGELOG.md', 'LICENSE'],
  format: Formats.kebabCase,
};

export default function getOptions(options: Partial<Options> = {}): Options {
  return {
    ...options,
    ...defaultOptions,
  };
}
