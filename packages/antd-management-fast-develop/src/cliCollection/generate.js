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
    _optionValues: { dataPath = '', relativeFolder = '.' },
  } = o;

  if (checkStringIsEmpty(dataPath)) {
    promptWarn('please input data json file path, use --help to get help info');

    exit();
  }

  const data = readJsonFileSync(dataPath);

  if (isObject(data)) {
    if (Array.isArray(data.list)) {
      promptInfo('File will generate, please wait a moment');

      generate(data.list, relativeFolder);

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
  }

  exit();
};
