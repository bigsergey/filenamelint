import glob from 'fast-glob';

import { ExitCodes, ignore } from './constants';
import lintFiles from './lint-files';
interface Options {
  ignore: string[];
}

const defaultOptions = {
  ignore,
};

export default function main({ ignore }: Options = defaultOptions): Promise<number> {
  return glob('**/*', { ignore })
    .then(files => {
      const errorMessages = lintFiles(files);

      if (errorMessages.length > 0) {
        errorMessages.forEach(message => console.error(message));
        return ExitCodes.SuccessWithLintingErrors;
      }

      return ExitCodes.SuccessNoLintingErrors;
    })
    .catch(error => {
      console.error(error);
      return ExitCodes.UnexpectedError;
    });
}
