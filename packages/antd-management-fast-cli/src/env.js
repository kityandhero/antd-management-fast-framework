const { resolve } = require("path");
const fs = require("fs-extra");
const term = require("terminal-kit").terminal;
const shell = require("shelljs");

exports.run = function (o) {
  term.green(`install develop environment by ${o}\r`);

  const packagePath = resolve(`./node_modules/${o}/package.json`);
  const packageProjectPath = resolve(`./package.json`);

  fs.readJson(packageProjectPath)
    .then((packageProject) => {
      const listDependenciesProject = [];
      const listDevDependenciesProject = [];

      const dependenciesProject = packageProject.dependencies;

      Object.entries(dependenciesProject).forEach(([key, value]) => {
        listDependenciesProject.push(`${key}@${value}`);
      });

      const devDependenciesProject = packageProject.devDependencies;

      Object.entries(devDependenciesProject).forEach(([key, value]) => {
        listDevDependenciesProject.push(`${key}@${value}`);
      });

      shell.exec(`pnpm remove ${listDependenciesProject.join(" ")} -P`);

      shell.exec(`pnpm remove ${listDevDependenciesProject.join(" ")} -D`);

      fs.readJson(packagePath)
        .then((p) => {
          const listDependencies = [];
          const listDevDependencies = [];

          const dependencies = p.dependencies;

          Object.entries(dependencies).forEach(([key, value]) => {
            listDependencies.push(`${key}@${value}`);
          });

          const devDependencies = p.devDependencies;

          Object.entries(devDependencies).forEach(([key, value]) => {
            listDevDependencies.push(`${key}@${value}`);
          });

          shell.exec(`pnpm add ${listDependencies.join(" ")} -P`);

          shell.exec(`pnpm add ${listDevDependencies.join(" ")} -D`);

          process.exit();
        })
        .catch((err) => {
          console.error(err);

          process.exit();
        });
    })
    .catch((err) => {
      console.error(err);

      process.exit();
    });
};
