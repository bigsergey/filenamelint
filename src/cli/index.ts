#!/usr/bin/env node
import program from 'commander';

import main from '../main';
import collect from './collect';

program.version(require('../../package.json').version);

program.option('--ignore <path>', 'Specify path of ignore file', collect, []);

program.parse(process.argv);

main({ ignore: program.ignore }).then(process.exit);
