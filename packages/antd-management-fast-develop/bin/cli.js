#!/usr/bin/env node

/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { Command } = require('commander');
const { getArgCollection } = require('easy-soft-develop');

const generator = require('../src/cliCollection/generate');
const templateGenerator = require('../src/cliCollection/generateTemplate');

const program = new Command();

process.title = 'easy-soft-develop';

program.version(require('../package').version).usage('<command> [options]');

program
  .command('generate')
  .description('generate file from data source and template')
  .option('--dataPath <string>', 'data json source file path')
  .option('--folderName <string>', 'folder Name contain the function component')
  .option(
    '--relativeFolder <bool>',
    'file will be generate by the relative folder path, default is "."',
  )
  .action((a, o) => {
    generator.run(a, o);
  });

program
  .command('generateByTemplate')
  .description('generate file by template')
  .option('--dataPath <string>', 'data json source file path')
  .option('--templatePath <string>', 'template file path')
  .option(
    '--relativeFolder <bool>',
    'file will be generate by the relative folder path, default is "."',
  )
  .action((a, o) => {
    templateGenerator.run(a, o);
  });

program.parse(getArgCollection());
