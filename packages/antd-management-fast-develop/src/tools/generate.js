/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { compile } = require('ejs');
const {
  writeFileSync,
  mkdirSync,
  promptSuccess,
} = require('easy-soft-develop');

let { templateContent } = require('../template');

mkdirSync('./FunctionExtra', {
  recursive: true,
});

function generate(dataSource, relativeFolder) {
  const dataAdjust = dataSource.map((o) => adjustSource(o));

  for (const o of dataAdjust) {
    let content = compile(templateContent)({ o });

    mkdirSync(`${relativeFolder}/FunctionExtra/${o.functionSegment}`);

    writeFileSync(
      `${relativeFolder}/FunctionExtra/${o.functionSegment}/index.jsx`,
      content,
      {
        coverFile: true,
      },
    );

    promptSuccess(
      `generate "${relativeFolder}/FunctionExtra/${o.functionSegment}/index.jsx" complete`,
    );
  }
}

function adjustSource(o) {
  const d = { ...o };

  d.defineName = toLowerFirst(d.functionSegment);

  return d;
}

function toLowerFirst(o) {
  return `${o.charAt(0)}`.toLowerCase() + o.slice(1);
}

module.exports = {
  generate,
};
