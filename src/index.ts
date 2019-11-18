import glob from 'fast-glob';

import lintFiles from './lint-files';

glob('**/*', { ignore: ['node_modules', 'README.md', 'CHANGELOG.md', 'LICENSE'] })
  .then(files => {
    const errorMessages = lintFiles(files);

    if (errorMessages.length > 0) {
      errorMessages.forEach(message => console.error(message));
      process.exit(1);
    } else {
      console.log('Success!!');
      process.exit(0);
    }
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
