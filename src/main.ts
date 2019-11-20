import glob from 'fast-glob';

import lintFiles from './lint-files';

export const SUCCESS_NO_LINTING_ERRORS = 0;
export const SUCCESS_WITH_LINTING_ERRORS = 1;
export const UNEXPECTED_ERROR = 2;

const ignore = ['node_modules', 'README.md', 'CHANGELOG.md', 'LICENSE'];

export default function main(): Promise<number> {
  return glob('**/*', { ignore })
    .then(files => {
      const errorMessages = lintFiles(files);

      if (errorMessages.length > 0) {
        errorMessages.forEach(message => console.error(message));
        return SUCCESS_WITH_LINTING_ERRORS;
      } else {
        return SUCCESS_NO_LINTING_ERRORS;
      }
    })
    .catch(error => {
      console.error(error);
      return UNEXPECTED_ERROR;
    });
}
