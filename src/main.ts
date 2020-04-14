import getOptions, { Options } from './options';
import getSources from './get-sources';
import lintSources from './lint-sources';

export enum ExitCodes {
  SuccessNoLintingErrors = 0,
  SuccessWithLintingErrors = 1,
  UnexpectedError = 2,
}

export default function main(options?: Partial<Options>): Promise<ExitCodes> {
  return getOptions(options)
    .then(getSources)
    .then(lintSources)
    .then(errorMessages => {
      if (errorMessages.size > 0) {
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
