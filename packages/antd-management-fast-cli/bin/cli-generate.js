#!/usr/bin/env node

const { Command } = require("commander");
const generate = require("../src/generate");

const program = new Command();

program
  .command("generate")
  .description("quick generate your file")
  // .alias("g")
  .argument("type", "type is a params")
  .argument("name", "name is a params")
  .action((type, name) => {
    // console.log({ str, options });
    // const limit = options.first ? 1 : undefined;
    // console.log(str.split(options.separator, limit));
    console.log({ type, name });
    generate.run(type, name);
  });

program.parse(process.argv);
