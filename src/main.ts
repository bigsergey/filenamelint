import glob from 'fast-glob';

import lintFiles from './lint-files';

export const ERROR_CODE = 1;
export const SUCCESS_CODE = 0;

const ignore = ['node_modules', 'README.md', 'CHANGELOG.md', 'LICENSE'];

export default function main(): Promise<number> {
  return glob('**/*', { ignore })
    .then(files => {
      const errorMessages = lintFiles(files);

      if (errorMessages.length > 0) {
        errorMessages.forEach(message => console.error(message));
        return ERROR_CODE;
      } else {
        return SUCCESS_CODE;
      }
    })
    .catch(error => {
      console.error(error);
      return ERROR_CODE;
    });
}
