import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
  index: 'src/index.jsx',
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [
      '@babel/parser',
      '@ant-design/icons',
      '@designable/core',
      '@designable/shared',
      '@formily/antd-v5',
      '@formily/core',
      '@formily/json-schema',
      '@formily/react',
      '@formily/reactive',
      '@formily/reactive-react',
      '@formily/shared',
      '@juggle/resize-observer',
      '@monaco-editor/loader',
      '@monaco-editor/react',
      'classnames',
      'dateformat',
      'dayjs',
      'easy-soft-utility',
      'monaco-editor',
      'react',
      'react-color',
      'react-dom',
    ],
    postcssConfig: {
      modules: false,
    },
  });
}
