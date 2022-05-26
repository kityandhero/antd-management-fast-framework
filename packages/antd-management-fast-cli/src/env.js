const { resolve } = require("path");
const fs = require("fs-extra");
const term = require("terminal-kit").terminal;
const shell = require("shelljs");

exports.run = function (o) {
  term.green(`install develop environment by ${o}\r`);

  const package = resolve(`./node_modules/${o}/package.json`);

  console.log(package);

  fs.readJson(package)
    .then((packageObj) => {
      const devDependenciesList = [];

      const devDependencies = packageObj.devDependencies;

      Object.entries(devDependencies).forEach(([key, value]) => {
        devDependenciesList.push(`${key}@${value}`);
      });

      shell.exec(`pnpm add ${devDependenciesList.join(" ")}`);

      process.exit();
    })
    .catch((err) => {
      console.error(err);

      process.exit();
    });
};
