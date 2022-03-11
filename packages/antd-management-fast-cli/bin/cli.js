#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

process.title = "antd-fast-cli";

program
  .version(require("../package").version)
  .usage("<command> [options]")
  .command("generate", 'generate file from a template (short-cut alias: "g")')
  .parse(process.argv);

require("./cli-generate");
