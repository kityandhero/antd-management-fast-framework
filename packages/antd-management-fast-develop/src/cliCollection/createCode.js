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
} = require('easy-soft-develop');
const { generateCode } = require('../tools/createCode');

exports.run = function (s, o) {
  const {
    _optionValues: { dataPath = '' },
  } = o;

  if (checkStringIsEmpty(dataPath)) {
    promptWarn('please input data json file path, use --help to get help info');

    exit();
  }

  const data = readJsonFileSync(dataPath);

  if (isObject(data)) {
    if (Array.isArray(data.list)) {
      promptInfo('Code file will create, please wait a moment');

      generateCode(data.list);
    } else {
      const simple = {
        list: [
          {
            sourceFilePath: 'componentA/index.jsx',
            codeFilePath: 'componentA/codeSource.js',
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
