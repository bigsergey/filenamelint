import glob from 'fast-glob';

import lintFiles from './lint-files';

glob('**/*', { ignore: ['node_modules'] })
  .then((files: string[]): void => {
    const errorMessages: string[] = lintFiles(files);

    if (errorMessages.length > 0) {
      errorMessages.forEach(message => console.error(message));
      process.exit(1);
    } else {
      console.log('Success!!');
      process.exit(0);
    }
  })
  .catch((error: Error): void => {
    console.error(error);
    process.exit(1);
  });
