import fs from 'fs';
import path from 'path';

import { Options } from './index';

const configFileName = '.filenamelintrc';

function isFileEmpty(content: string): boolean {
  return content.trim() === '';
}

async function isFileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export default async function getOptionsFromFile(): Promise<Partial<Options>> {
  const configFilePath = path.join(process.cwd(), configFileName);

  if (await isFileExists(configFilePath)) {
    const content = await fs.promises.readFile(configFilePath, 'utf8');

    if (isFileEmpty(content)) {
      return {};
    }
    try {
      const options = JSON.parse(content);

      return options;
    } catch ({ message }) {
      throw new Error(`${configFileName} file has incorrect format. ${message}`);
    }
  }

  return {};
}
