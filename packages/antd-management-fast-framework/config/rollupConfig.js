import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
  index: 'src/index.jsx',
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [
      'antd-management-fast-common',
      'antd-management-fast-component',
      'antd-management-fast-design-playground',
      'antd-management-fast-design-react',
      'antd-management-fast-formily',
      'antd-management-fast-charts',
    ],
  });
}

/**
 * 占位函数
 *
 */
export function emptyExport() {
  return {};
}
