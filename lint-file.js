const path =require('path');

const kebabCase = /^[a-z0-9]*(?:[a-z0-9+-])+[a-z0-9]+$/;

module.exports = function lintFile(file) {
  const extensionName = path.extname(file);
  const basename = path.basename(file, extensionName);
  const isValid = kebabCase.test(basename);
  const error = !isValid
    ? { message: `${file} has wrong name.` }
    : undefined;

  return {
    isValid,
    error,
  };
}
