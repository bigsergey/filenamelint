const glob = require('fast-glob');
const pipe = require('function-pipe');

const lintFile = require('./lint-file');

glob('**/*', { ignore: ['node_modules'] })
  .then(pipe(
    files => files.map(lintFile),
    files => files.filter(Boolean),
    errorMessages => {
      if (errorMessages.length > 0) {
        errorMessages.forEach(message => console.error(message));
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
