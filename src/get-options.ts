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
  ignore: ['node_modules/**', 'coverage/**', 'README.md', 'CHANGELOG.md', 'LICENSE'],
  format: Formats.kebabCase,
};

export default function getOptions({ ignore, format }: Partial<Options> = {}): Options {
  return {
    ignore: ignore || defaultOptions.ignore,
    format: format || defaultOptions.format,
  };
}
