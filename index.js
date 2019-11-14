const glob = require('fast-glob');
const pipe = require('function-pipe');

const lintFile = require('./lint-file');
const logErrors = require('./log-errors');

glob('**/*', { ignore: ['node_modules'] })
  .then(pipe(
    files => files.map(lintFile),
    files => files.filter(({ isValid }) => !isValid),
    files => {
      if (files.length > 0) {
        logErrors(files);
        process.exit(1);
      } else {
        console.log('Success!!')
        process.exit(0);
      }
    }
  ))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
