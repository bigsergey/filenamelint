import glob from 'fast-glob';

import getOptions, { Options } from './get-options';
import lintFiles from './lint-files';

export enum ExitCodes {
  SuccessNoLintingErrors = 0,
  SuccessWithLintingErrors = 1,
  UnexpectedError = 2,
}

export default function main(options: Partial<Options>): Promise<ExitCodes> {
  const { ignore, format } = getOptions(options);
  return glob('**/*', { ignore })
    .then(files => {
      const errorMessages = lintFiles(files, format);

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
