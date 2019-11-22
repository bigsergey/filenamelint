import glob from 'fast-glob';

import { ExitCodes } from './constants';
import lintFiles from './lint-files';

const ignore = ['node_modules', 'README.md', 'CHANGELOG.md', 'LICENSE'];

export default function main(): Promise<number> {
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
