/**
generate by easy-soft-develop
*/

const developPackageList = [
  '@rollup/plugin-alias',
  '@rollup/plugin-babel',
  '@rollup/plugin-buble',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-json',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-replace',
  '@rollup/plugin-terser',
  '@rollup/plugin-url',
  '@svgr/rollup',
  'autoprefixer',
  'cssnano',
  'rollup',
  'rollup-plugin-copy',
  'rollup-plugin-livereload',
  'rollup-plugin-polyfill-node',
  'rollup-plugin-postcss',
  'rollup-plugin-serve',
  'rollup-plugin-typescript2',
];

export const childrenSpecialDevelopPackageList = [
  {
    name: 'antd-management-fast-common',
    packages: developPackageList,
  },
  {
    name: 'antd-management-fast-component',
    packages: developPackageList,
  },
  {
    name: 'antd-management-fast-framework',
    packages: developPackageList,
  },
];
