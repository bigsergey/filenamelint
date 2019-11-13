module.exports = function logErrors(files) {
  files.forEach(({ error:  { message } = {} }) => {
    console.error(message);
  })
}
