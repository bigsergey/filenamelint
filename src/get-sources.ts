import glob from 'fast-glob';

import { Formats, Options } from './options';

export default async function getSources({
  format,
  ignore,
  overrides,
}: Options): Promise<{ files: string[]; format: Formats }[]> {
  return Promise.all(
    [
      {
        files: '**/*',
        ignore,
        format,
      },
      ...overrides.map(override => ({
        format,
        ...override,
      })),
    ].map(async ({ files, ignore, format }) => ({
      files: await glob(files, { ignore }),
      format,
    })),
  );
}
