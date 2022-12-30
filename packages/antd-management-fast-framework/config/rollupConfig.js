import { buildConfig as buildConfigCore } from '../../antd-management-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    'utils/typeCheck': 'src/utils/typeCheck.js',
  },
  // ...{
  //   'customComponents/index': 'src/customComponents/index.jsx',
  // },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({ inputFile, terser: whetherTerser });
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
