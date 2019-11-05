const glob = require('fast-glob');
const path =require('path');

const join = (...args) => args.join('/');

const kebabCase = /^[a-z0-9]*(?:[a-z0-9+-])+[a-z0-9]+$/;

glob(join('**', '*'), { ignore: ['node_modules'] })
  .then(files => {
    files.forEach(file => {
      const extensionName = path.extname(file);
      const basename = path.basename(file, extensionName);

      if (!kebabCase.test(basename)) {
        console.error(`${file} has wrong name`);
      }
    });
  })
  .catch(console.error);
