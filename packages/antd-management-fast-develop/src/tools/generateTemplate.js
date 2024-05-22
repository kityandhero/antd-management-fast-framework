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

function generate(dataSource, templateContent, relativeFolder) {
  const dataAdjust = dataSource.map((o) => adjustSource(o));

  for (const o of dataAdjust) {
    let content = compile(templateContent)({ o });

    mkdirSync(`${relativeFolder}/${o.folder}`);

    const { fileName, coverFile } = {
      fileName: 'index.jsx',
      coverFile: false,
      ...o,
    };

    writeFileSync(
      `${relativeFolder}/${o.folder}/${fileName || 'index.jsx'}`,
      content,
      {
        coverFile: coverFile || false,
      },
    );

    promptSuccess(
      `Generate complete: "${relativeFolder}/${o.folder}/${fileName || 'index.jsx'}".`,
    );
  }
}

function adjustSource(o) {
  const d = { ...o };

  const folder = d.folder;

  if (folder === undefined) {
    promptWarn('data has error, check item: ');

    console.log(d);

    promptEmptyLine();

    throw new Error('data has not key "functionSegment"');
  }

  return d;
}

module.exports = {
  generate,
};
