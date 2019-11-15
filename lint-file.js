const path =require('path');
const kebabCase = require('kebab-case');

module.exports = function lintFile(file) {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = kebabCase(basename) === basename;

  return isValid ? undefined : `${file} has wrong name.`;
}
