const glob = require('fast-glob');

const lintFile = require('./lint-file');
const logErrors = require('./log-errors');

glob('**/*', { ignore: ['node_modules'] })
  .then(files => files.map(lintFile))
  .then(files => files.filter(({ isValid }) => !isValid))
  .then(files => {
    if (files.length > 0) {
      logErrors(files);
      process.exit(1);
    } else {
      console.log('Success!!')
      process.exit(0);
    }
  })
  .catch(console.error);
