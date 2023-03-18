#!/usr/bin/env node

/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { Command } = require('commander');
const { getArgCollection } = require('easy-soft-develop');

const generator = require('../src/cliCollection/generate');

const program = new Command();

process.title = 'easy-soft-develop';

program.version(require('../package').version).usage('<command> [options]');

program
  .command('generate')
  .description('generate file from data source and template')
  .option('--dataPath <string>', 'data json source file path')
  .option(
    '--relativeFolder <bool>',
    'file will be generate by the relative folder path, default is "."',
  )
  .action((a, o) => {
    generator.run(a, o);
  });

program.parse(getArgCollection());
