import { Options } from './index';

interface FilesConfig {
  files: string[];
}

export type Override = FilesConfig & Partial<Options>;

export interface Overrides {
  [index: number]: Override;
  length: number;
}
