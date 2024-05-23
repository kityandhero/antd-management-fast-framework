/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { compile } = require('ejs');
const {
  writeFileSync,
  mkdirSync,
  promptSuccess,
  promptWarn,
  promptEmptyLine,
} = require('easy-soft-develop');

let { templateContent } = require('../template');

function generate(dataSource, folderName, relativeFolder) {
  const dataAdjust = dataSource.map((o) => adjustSource(o));

  const exportList = [];

  for (const o of dataAdjust) {
    checkDataItem(o);

    let content = compile(templateContent)({ o });

    mkdirSync(`${relativeFolder}/${folderName}/${o.functionSegment}`);

    writeFileSync(
      `${relativeFolder}/${folderName}/${o.functionSegment}/index.jsx`,
      content,
      {
        coverFile: true,
      },
    );

    promptSuccess(
      `Generate "${relativeFolder}/${folderName}/${o.functionSegment}/index.jsx" complete`,
    );

    exportList.push(`export * from './${o.functionSegment}';`);
  }

  return exportList;
}

function adjustSource(o) {
  const d = { ...o };

  const functionSegment = d.functionSegment;

  if (functionSegment === undefined) {
    promptWarn('data has error, check item: ');

    console.log(d);

    promptEmptyLine();

    throw new Error('data has not key "functionSegment"');
  }

  d.defineName = toLowerFirst(d.functionSegment);

  return d;
}

function toLowerFirst(o) {
  return `${o.charAt(0)}`.toLowerCase() + o.slice(1);
}

function checkDataItem(item) {
  if (item.functionSegment === undefined) {
    promptWarn('data has error, check item: ');

    console.log(item);

    promptEmptyLine();

    throw new Error('data has not key "functionSegment"');
  }

  if (item.defineName === undefined) {
    promptWarn('data has error, check item: ');

    console.log(item);

    promptEmptyLine();

    throw new Error('data has not key "defineName"');
  }

  if (item.label === undefined) {
    promptWarn('data has error, check item: ');

    console.log(item);

    promptEmptyLine();

    throw new Error('data has not key "label"');
  }

  if (item.name === undefined) {
    promptWarn('data has error, check item: ');

    console.log(item);

    promptEmptyLine();

    throw new Error('data has not key "name"');
  }
}

module.exports = {
  generate,
};
