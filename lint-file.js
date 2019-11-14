const path =require('path');
const kebabCase = require('kebab-case');

module.exports = function lintFile(file) {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = kebabCase(basename) === basename;
  const error = !isValid
    ? { message: `${file} has wrong name.` }
    : undefined;

  return {
    isValid,
    error,
  };
}
