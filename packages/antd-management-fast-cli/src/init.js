const fs = require("fs-extra");
const term = require("terminal-kit").terminal;
const mkdirp = require("mkdirp");
const download = require("download-git-repo");

const url = "github:kityandhero/antd-management-fast-templete.git";

exports.run = function (folder) {
  console.log(`template: ${url}`);

  console.log({
    template: url,
    folder: __dirname + "/" + folder,
  });

  download(url, __dirname + "/" + folder, { clone: true }, (err) => {
    console.log(err);
  });

  // if (currentDir.exsits(folder)) {
  //   console.warn(folder + "文件夹已经存在于当前目录中，请更换");
  // } else {
  //   download(
  //     "https://github.com/kityandhero/antd-management-fast-templete.git",
  //     currentDir + "/" + folder
  //   );
  // }
};
