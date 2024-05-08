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
} = require('easy-soft-develop');
const { generate } = require('../tools/generate');

exports.run = function (s, o) {
  const {
    _optionValues: { dataPath = '', dataExtraPath = '', relativeFolder = '.' },
  } = o;

  if (checkStringIsEmpty(dataPath)) {
    promptWarn('please input data json file path, use --help to get help info');

    exit();
  }

  const data = readJsonFileSync(dataPath);

  let crateFileSuccess = false;

  if (isObject(data) && Array.isArray(data.list)) {
    promptInfo('File will generate, please wait a moment');

    generate(data.list, relativeFolder);

    crateFileSuccess = true;
  }

  const dataExtra = readJsonFileSync(dataExtraPath);

  if (isObject(dataExtra) && Array.isArray(dataExtra.list)) {
    promptInfo('File extra will generate, please wait a moment');

    generate(dataExtra.list, relativeFolder);

    crateFileSuccess = true;
  }

  if (crateFileSuccess) {
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
