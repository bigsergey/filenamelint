import program from 'commander';

import collect from './collect';

program.version(require('../../package.json').version);

program.option('--ignore-pattern <pattern>', 'Pattern of files to ignore', collect);
program.option('--format <string>', 'File name format');

program.parse(process.argv);

const { ignorePattern, format } = program;

export default { ignore: ignorePattern, format };
