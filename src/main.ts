import glob from 'fast-glob';

import getOptions, { Options } from './options';
import lintFiles from './lint-files';

export enum ExitCodes {
  SuccessNoLintingErrors = 0,
  SuccessWithLintingErrors = 1,
  UnexpectedError = 2,
}

export default function main(options?: Partial<Options>): Promise<ExitCodes> {
  return getOptions(options)
    .then(({ ignore, format }) =>
      glob('**/*', { ignore }).then(files => {
        const errorMessages = lintFiles(files, format);

        if (errorMessages.length > 0) {
          errorMessages.forEach(message => console.error(message));
          return ExitCodes.SuccessWithLintingErrors;
        }

        return ExitCodes.SuccessNoLintingErrors;
      }),
    )
    .catch(({ message } = {}) => {
      console.log(message);
      return ExitCodes.UnexpectedError;
    });
}
