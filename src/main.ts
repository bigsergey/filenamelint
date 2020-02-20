import glob from 'fast-glob';

import getOptions, { Options } from './options';
import lintFiles from './lint-files';
import getSources from './patters';

export enum ExitCodes {
  SuccessNoLintingErrors = 0,
  SuccessWithLintingErrors = 1,
  UnexpectedError = 2,
}

export default function main(options?: Partial<Options>): Promise<ExitCodes> {
  return getOptions(options)
    .then(getSources)
    .then(async sources => {
      const promises = sources.map(async ({ files, ignore, format }) => {
        return lintFiles(await glob(files, { ignore }), format);
      });

      const errorMessages = await Promise.all(promises);

      if (errorMessages.length > 0) {
        errorMessages.forEach(message => console.error(message));
        return ExitCodes.SuccessWithLintingErrors;
      }

      return ExitCodes.SuccessNoLintingErrors;
    })
    .catch(error => {
      console.log(error.message);
      return ExitCodes.UnexpectedError;
    });
}
