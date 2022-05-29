const { resolve } = require("path");
const fs = require("fs-extra");
const term = require("terminal-kit").terminal;
const shell = require("shelljs");
const download = require("download");
const agent = require("hpagent");

const { HttpsProxyAgent } = agent;

exports.run = async function (s, o) {
  const {
    _optionValues: { agent, file },
  } = o;

  let packageTempPath = "";

  if (agent) {
    console.log(`agent: ${agent}`);

    const packageUrl =
      "https://raw.githubusercontent.com/kityandhero/antd-management-fast-framework/master/packages/antd-management-fast-framework/package.json";

    await download(packageUrl, resolve(`./temp`), {
      ...(agent
        ? {
            agent: {
              https: new HttpsProxyAgent({
                keepAlive: true,
                keepAliveMsecs: 1000,
                maxSockets: 256,
                maxFreeSockets: 256,
                scheduling: "lifo",
                proxy: agent,
              }),
            },
          }
        : {}),
    });

    term.green(`install develop environment by repo:main\r`);

    packageTempPath = resolve(`./temp/package.json`);
  } else {
    packageTempPath = resolve(file);
  }

  const packageProjectPath = resolve(`./package.json`);

  fs.readJson(packageTempPath)
    .then((packageTemp) => {
      fs.readJson(packageProjectPath)
        .then((p) => {
          const dependencies = packageTemp.dependencies;
          const devDependencies = packageTemp.devDependencies;

          p.dependencies = dependencies;
          p.devDependencies = devDependencies;

          fs.writeJson(packageProjectPath, p)
            .then(() => {
              term.green(`update package.json success!\r`);

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
    })
    .catch((err) => {
      console.error(err);

      process.exit();
    });
};
