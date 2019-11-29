#!/usr/bin/env node
import program from 'commander';

import main from '../main';
import collect from './collect';
import getOptions from '../get-options';

program.version(require('../../package.json').version);

program.option('--ignore-pattern <pattern>', 'Pattern of files to ignore', collect);

program.parse(process.argv);

const { ignorePattern } = program;

main(getOptions({ ignore: ignorePattern })).then(process.exit);
