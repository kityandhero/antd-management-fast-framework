#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

process.title = "antd-management-fast-cli";

program.version(require("../package").version).usage("<command> [options]");

require("./cli-init");
