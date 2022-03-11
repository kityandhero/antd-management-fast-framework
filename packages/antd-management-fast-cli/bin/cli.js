#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

process.title = "antd-fast-cli";

program
  .version(require("../package").version)
  .usage("<command> [options]")
  .command("init", "init from template")
  .parse(process.argv);

require("./cli-init");
