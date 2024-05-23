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
  promptError,
} = require('easy-soft-develop');
const { generate } = require('../tools/generate');

exports.run = function (s, o) {
  const {
    _optionValues: {
      dataPath = '',
      folderName = 'FunctionSpecialComponent',
      relativeFolder = '.',
    },
  } = o;

  if (checkStringIsEmpty(dataPath)) {
    promptWarn(
      'please input data json file path or data extra json file path, use --help to get help info',
    );

    exit();
  }

  if (checkStringIsEmpty(folderName)) {
    promptError('folder name disallow empty, use --help to get help info!');

    exit();
  }

  const removeCmd = `rimraf ${relativeFolder}/${folderName}`;

  promptInfo(`remove ${folderName}: ${removeCmd}`);

  exec(removeCmd);

  mkdirSync(`${relativeFolder}/${folderName}`, {
    recursive: true,
  });

  let crateFileSuccess = false;

  let exportList = [];

  if (!checkStringIsEmpty(dataPath)) {
    const data = readJsonFileSync(dataPath);

    if (isObject(data) && Array.isArray(data.list)) {
      promptInfo('File will generate, please wait a moment');

      const list = generate(data.list, folderName, relativeFolder);

      crateFileSuccess = true;

      exportList = [...exportList, ...list];
    }
  }

  if (crateFileSuccess) {
    if (exportList.length > 0) {
      writeFileSync(
        `${relativeFolder}/${folderName}/index.jsx`,
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
