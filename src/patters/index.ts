import { Overrides } from '../options/index';
import { Options } from '../options';

export default function getSources({ format, ignore, overrides }: Options): Overrides {
  return [
    {
      files: '**/*',
      ignore,
      format,
    },
    ...overrides.map(override => ({
      format,
      ...override,
    })),
  ];
}
