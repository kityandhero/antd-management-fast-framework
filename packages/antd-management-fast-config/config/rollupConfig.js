import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
  index: 'src/index.js',
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [],
    babelConfig: {
      // babelHelpers: 'inline',
    },
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
