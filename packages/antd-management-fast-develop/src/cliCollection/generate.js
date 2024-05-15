/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const {
  writeFileSync,
  promptWarn,
  checkStringIsEmpty,
  readJsonFileSync,
  isObject,
  exit,
  promptInfo,
  exec,
  mkdirSync,
} = require('easy-soft-develop');
const { generate } = require('../tools/generate');

exports.run = function (s, o) {
  const {
    _optionValues: { dataPath = '', dataExtraPath = '', relativeFolder = '.' },
  } = o;

  if (checkStringIsEmpty(dataPath) && checkStringIsEmpty(dataExtraPath)) {
    promptWarn(
      'please input data json file path or data extra json file path, use --help to get help info',
    );

    exit();
  }

  const removeCmd = `rimraf ${relativeFolder}/FunctionExtra`;

  promptInfo(`remove FunctionExtra: ${removeCmd}`);

  exec(removeCmd);

  mkdirSync(`${relativeFolder}/FunctionExtra`, {
    recursive: true,
  });

  let crateFileSuccess = false;

  let exportList = [];

  if (!checkStringIsEmpty(dataPath)) {
    const data = readJsonFileSync(dataPath);

    if (isObject(data) && Array.isArray(data.list)) {
      promptInfo('File will generate, please wait a moment');

      const list = generate(data.list, relativeFolder);

      crateFileSuccess = true;

      exportList = [...exportList, ...list];
    }
  }

  if (!checkStringIsEmpty(dataExtraPath)) {
    const dataExtra = readJsonFileSync(dataExtraPath);

    if (isObject(dataExtra) && Array.isArray(dataExtra.list)) {
      promptInfo('File extra will generate, please wait a moment');

      const list = generate(dataExtra.list, relativeFolder);

      crateFileSuccess = true;

      exportList = [...exportList, ...list];
    }
  }

  if (crateFileSuccess) {
    if (exportList.length > 0) {
      writeFileSync(
        `${relativeFolder}/FunctionExtra/index.jsx`,
        exportList.join(''),
        {
          coverFile: true,
        },
      );
    }

    const cmdEslint = `npx eslint --fix --cache --ext .js,.jsx,.ts,.tsx ${relativeFolder}/`;

    promptInfo(`Eslint generated file: ${cmdEslint}`);

    exec(cmdEslint);

    const cmdFormat = `npx prettier --cache --write ${relativeFolder}/`;

    promptInfo(`Format generated file: ${cmdFormat}`);

    exec(cmdFormat);
  } else {
    const simple = {
      list: [
        {
          functionSegment: 'SimpleStatus',
          label: '状态',
          name: 'status',
        },
      ],
    };

    promptWarn(
      `in the data json file, key "list" value is not an array, it must be like this ${JSON.stringify(
        simple,
      )}`,
    );
  }

  exit();
};
