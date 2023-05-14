/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const {
  writeFileSync,
  promptSuccess,
  promptWarn,
  promptEmptyLine,
} = require('easy-soft-develop');

const { readFileSync } = require('node:fs');

function getCodeContent(code) {
  const v = `${code}`.replaceAll('`', '\\`').replaceAll('$', '\\$');
  return `export const code = \`${v}\`;
`;
}

function generateCode(dataSource) {
  const dataAdjust = dataSource.map((o) => adjustSource(o));

  for (const o of dataAdjust) {
    checkDataItem(o);

    const { sourceFilePath, codeFilePath } = o;

    const codeSource = readFileSync(sourceFilePath);

    const content = getCodeContent(codeSource);

    writeFileSync(codeFilePath, content, {
      coverFile: true,
    });

    promptSuccess(`Create "${codeFilePath}" complete`);
  }
}

function adjustSource(o) {
  const d = { ...o };

  const sourceFilePath = d.sourceFilePath;

  if (sourceFilePath === undefined) {
    promptWarn('data has error, check item: ');

    console.log(d);

    promptEmptyLine();

    throw new Error('data has not key "sourceFilePath"');
  }

  const codeFilePath = d.codeFilePath;

  if (codeFilePath === undefined) {
    promptWarn('data has error, check item: ');

    console.log(d);

    promptEmptyLine();

    throw new Error('data has not key "codeFilePath"');
  }

  return d;
}

function checkDataItem(item) {
  if (item.sourceFilePath === undefined) {
    promptWarn('data has error, check item: ');

    console.log(item);

    promptEmptyLine();

    throw new Error('data has not key "sourceFilePath"');
  }

  if (item.codeFilePath === undefined) {
    promptWarn('data has error, check item: ');

    console.log(item);

    promptEmptyLine();

    throw new Error('data has not key "codeFilePath"');
  }
}

module.exports = {
  generateCode,
};
