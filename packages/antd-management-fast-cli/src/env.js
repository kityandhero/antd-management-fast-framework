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
      // const dependenciesProject = packageProject.dependencies;
      // const devDependenciesProject = packageProject.devDependencies;

      // const listDependenciesProject = [];
      // const listDevDependenciesProject = [];

      // Object.entries(dependenciesProject).forEach(([key, value]) => {
      //   listDependenciesProject.push(`${key}@${value}`);
      // });

      // Object.entries(devDependenciesProject).forEach(([key, value]) => {
      //   listDevDependenciesProject.push(`${key}@${value}`);
      // });

      // shell.exec(`pnpm remove ${listDependenciesProject.join(" ")} -P`);

      // shell.exec(`pnpm remove ${listDevDependenciesProject.join(" ")} -D`);

      fs.readJson(packagePath)
        .then((p) => {
          const dependencies = p.dependencies;
          const devDependencies = p.devDependencies;

          packageProject.dependencies = dependencies;
          packageProject.devDependencies = devDependencies;

          console.log(packageProject);

          fs.writeJson(packageProjectPath, packageProject)
            .then(() => {
              term.green(`update package success!\r`);

              process.exit();
            })
            .catch((err) => {
              console.error(err);

              process.exit();
            });

          // const listDependencies = [];
          // const listDevDependencies = [];

          // Object.entries(dependencies).forEach(([key, value]) => {
          //   listDependencies.push(`${key}@${value}`);
          // });

          // Object.entries(devDependencies).forEach(([key, value]) => {
          //   listDevDependencies.push(`${key}@${value}`);
          // });

          // shell.exec(`pnpm add ${listDependencies.join(" ")} -P`);

          // shell.exec(`pnpm add ${listDevDependencies.join(" ")} -D`);
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
