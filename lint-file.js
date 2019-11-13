const path =require('path');

const kebabCase = /^[a-z0-9]*(?:[a-z0-9+-])+[a-z0-9]+$/;

module.exports = function lintFile(file) {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);

  if (!kebabCase.test(basename)) {
    console.error(`${file} has wrong name`);
  }
}
