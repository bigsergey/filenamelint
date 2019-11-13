const glob = require('fast-glob');

const lintFile = require('./lint-file');

glob('**/*', { ignore: ['node_modules'] })
  .then(files => {
    files.forEach(lintFile)
  })
  .catch(console.error);
