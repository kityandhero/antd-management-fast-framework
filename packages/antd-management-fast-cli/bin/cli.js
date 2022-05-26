#!/usr/bin/env node

const { Command } = require("commander");
const init = require("../src/init");
const env = require("../src/env");

const program = new Command();

process.title = "antd-management-fast-cli";

program.version(require("../package").version).usage("<command> [options]");

program
  .command("init")
  .description("quick init your project")
  .parse(process.argv)
  .action(() => {
    init.run();
  });

program
  .command("env <name>")
  .description("install dev environment")
  .parse(process.argv)
  .option("--env <v>", "dev environment from target package")
  .action((item) => {
    env.run(item);
  });

program.parse(process.argv);
