import fs from 'fs';
import path from 'path';

import { Options } from './index';

const configFileName = '.filenamelintrc';

function isFileEmpty(content: string): boolean {
  return content.trim() === '';
}

export function getOptionsFromFile(): Partial<Options> {
  const configFilePath = path.join(process.cwd(), configFileName);

  if (fs.existsSync(configFilePath)) {
    const content = fs.readFileSync(configFilePath, 'utf8');

    if (isFileEmpty(content)) {
      return {};
    }

    const options = JSON.parse(content);

    return options;
  }

  return {};
}
