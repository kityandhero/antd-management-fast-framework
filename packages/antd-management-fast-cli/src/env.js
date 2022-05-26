const { resolve } = require("path");
const fs = require("fs-extra");
const term = require("terminal-kit").terminal;
const shell = require("shelljs");

exports.run = function (o) {
  term.green(`install develop environment by ${o}\r`);

  const package = resolve(`./node_modules/${o}/package.json`);

  fs.readJson(package)
    .then((packageObj) => {
      const list = [];

      const dependencies = packageObj.dependencies;

      Object.entries(dependencies).forEach(([key, value]) => {
        list.push(`${key}@${value}`);
      });

      const devDependencies = packageObj.devDependencies;

      Object.entries(devDependencies).forEach(([key, value]) => {
        list.push(`${key}@${value}`);
      });

      shell.exec(`pnpm add ${list.join(" ")}`);

      process.exit();
    })
    .catch((err) => {
      console.error(err);

      process.exit();
    });
};
