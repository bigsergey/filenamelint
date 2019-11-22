#!/usr/bin/env node

import program from 'commander';

program.version(require('../package.json').version).parse(process.argv);
