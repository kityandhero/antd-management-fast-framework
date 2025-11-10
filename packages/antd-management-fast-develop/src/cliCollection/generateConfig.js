/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */
const {
  promptWarn,
  checkStringIsEmpty,
  readJsonFileSync,
  isObject,
  exit,
  promptInfo,
  exec,
  resolvePath,
  promptLine,
  promptEmptyLine,
  promptError,
} = require('easy-soft-develop');
const { generateConfig } = require('../tools/generateConfig');

exports.run = function (s, o) {
  const {
    _optionValues: { dataPath = '' },
  } = o;

  if (checkStringIsEmpty(dataPath)) {
    promptWarn(
      'please input data json file path or data extra json file path, use --help to get help info',
    );

    exit();
  }

  promptEmptyLine();

  let crateFileSuccess = false;

  if (!checkStringIsEmpty(dataPath)) {
    const dataPathAbsolute = resolvePath(dataPath);

    const data = readJsonFileSync(dataPath);

    if (isObject(data) && Array.isArray(data.list)) {
      promptInfo('Config file will generate, please wait a moment.');

      if (checkStringIsEmpty(data.mainFolder ?? '')) {
        promptError('mainFolder disallow empty!');
      } else {
        generateConfig(data.list, data.mainFolder, dataPathAbsolute);

        crateFileSuccess = true;
      }
    }
  }

  if (crateFileSuccess) {
    promptLine();

    const cmdFormat = `npx prettier --cache --write ./`;

    promptInfo(`Format generated file: "${cmdFormat}".`);

    exec(cmdFormat);
  }

  exit();
};
