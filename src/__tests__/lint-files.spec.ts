import lintFiles from '../lint-files';

test('should return empty array for empty input', () => {
  expect(lintFiles([])).toEqual([]);
});

test('should return empty array when filenames are correct', () => {
  const files = [
    'file.js',
    'file-with-dashes.js',
    'src/pathWithCamelCase/index.css',
    'src/path-with-dashes/index.html',
  ];

  expect(lintFiles(files)).toEqual([]);
});

test('should return correct error messages for invalid filenames', () => {
  const files = [
    'file.js',
    'file-with-dashes.js',
    'Invalid-filename.js',
    'src/pathWithCamelCase/index.css',
    'src/path-with-dashes/index.html',
    'LICENSE',
    'src/path-with-dashes/camelCase.js',
  ];

  expect(lintFiles(files)).toEqual([
    'Invalid-filename.js has wrong name.',
    'LICENSE has wrong name.',
    'src/path-with-dashes/camelCase.js has wrong name.',
  ]);
});
