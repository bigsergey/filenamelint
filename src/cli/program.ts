import program from 'commander';

import collect from './collect';

program
  .version(require('../../package.json').version)
  .option('--ignore-pattern <pattern>', 'Pattern of files to ignore', collect)
  .option('--format <string>', 'File name format')
  .parse(process.argv);

const { ignorePattern, format } = program;

export default { ignore: ignorePattern, format };
