import program from 'commander';

import collect from './collect';

program.version(require('../../package.json').version);

program.option('--ignore-pattern <pattern>', 'Pattern of files to ignore', collect);

program.parse(process.argv);

const { ignorePattern } = program;

export default { ignore: ignorePattern };
