const glob = require('fast-glob');

const join = (...args) => args.join('/');

glob(join('**', '*'), { ignore: ['node_modules'] })
  .then(console.log)
  .catch(console.error);
