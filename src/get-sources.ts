import glob from 'fast-glob';

import { Formats, Options, Patterns } from './options';

interface Source {
  files: string | string[];
  ignore?: Patterns;
  format: Formats;
}

interface ResolvedSource {
  files: string[];
  format: Formats;
}

async function grabFiles({ files, ignore, format }: Source): Promise<ResolvedSource> {
  return {
    files: await glob(files, { ignore }),
    format,
  };
}

export default async function getSources({ format, ignore, overrides }: Options): Promise<ResolvedSource[]> {
  const defaultSource = {
    files: '**/*',
    ignore,
    format,
  };

  const overridesWithFormat = overrides.map((override) => ({
    format,
    ...override,
  }));

  return Promise.all([defaultSource, ...overridesWithFormat].map((source) => grabFiles(source)));
}
