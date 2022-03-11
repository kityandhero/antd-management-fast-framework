#!/usr/bin/env node

const { Command } = require("commander");
const init = require("../src/init");

const program = new Command();

program
  .command("init")
  .description("quick init your project")
  .argument("folder", "project folder")
  .action((folder) => {
    init.run(folder);
  });

program.parse(process.argv);
