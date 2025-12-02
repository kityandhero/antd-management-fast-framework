/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */
const { readFileSync } = require('node:fs');
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
} = require('easy-soft-develop');
const { generate } = require('../tools/generateTemplate');

exports.run = function (s, o) {
  const {
    _optionValues: { dataPath = '', templatePath = '', relativeFolder = '.' },
  } = o;

  if (checkStringIsEmpty(dataPath)) {
    promptWarn(
      'please input data json file path or data extra json file path, use --help to get help info',
    );

    exit();
  }

  promptLine();
  promptEmptyLine();

  promptInfo(`template path: "${resolvePath(templatePath)}".`);
  promptWarn(`template encoding make sure is utf-8.`);

  const templateContent = readFileSync(resolvePath(templatePath), {
    encoding: 'utf8',
  });

  promptLine();

  promptInfo(templateContent);

  promptLine();

  promptEmptyLine();

  let crateFileSuccess = false;

  if (!checkStringIsEmpty(dataPath)) {
    const data = readJsonFileSync(dataPath);

    if (isObject(data) && Array.isArray(data.list) && data.list.length > 0) {
      promptInfo('File will generate, please wait a moment.');

      generate(data.list, templateContent, relativeFolder);

      crateFileSuccess = true;
    }
  }

  if (crateFileSuccess) {
    // promptLine();

    // const cmdEslint = `npx eslint --fix --cache --ext .js,.jsx,.ts,.tsx ${relativeFolder}/`;

    // promptInfo(`Eslint generated file: "${cmdEslint}".`);

    // exec(cmdEslint);

    promptLine();

    const cmdFormat = `npx prettier --cache --write ${relativeFolder}/`;

    promptInfo(`Format generated file: "${cmdFormat}".`);

    exec(cmdFormat);
  }

  exit();
};
