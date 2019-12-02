#!/usr/bin/env node
import cliOptions from './program';
import main from '../main';

main(cliOptions).then(process.exit);
