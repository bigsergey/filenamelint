export interface Options {
  ignore?: string[];
}

export const defaultOptions = {
  ignore: ['node_modules/**', 'README.md', 'CHANGELOG.md', 'LICENSE'],
};

export default function getOptions({ ignore }: Options = {}): Options {
  return {
    ignore: ignore || defaultOptions.ignore,
  };
}
