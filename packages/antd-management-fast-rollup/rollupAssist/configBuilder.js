// import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
// import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
// import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import babelConfig from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

// import { pxToRemRoot } from '../../taro-fast-common/src/utils/constants';

const externalCollection = [
  '@ant-design/icons',
  '@babel/runtime',
  '@babel/helpers',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-json',
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-url',
  '@svgr/rollup',
  '@tarojs/components',
  'antd',
  'rollup-plugin-typescript2',
  'rollup-plugin-postcss',
  'rollup-plugin-terser',
  'postcss-pxtorem',
  'autoprefixer',
  'babel-plugin-prismjs',
  'bizcharts',
  'cssnano',
  'react',
  'react-dom',
  'react/jsx-runtime',
  'lodash',
  'qs',
  'dayjs',
  'node-cache',
  'react-redux',
  'redux',
  'redux-logger',
  'redux-thunk',
  'classnames',
  'prismjs',
  'object-hash',
  'invariant',
  'flatten',
  'mm',
  'warning',
  'global',
  'is-plain-object',
  'redux-saga',
];

export function buildConfig({
  inputFile,
  terser: whetherTerser = false,
  externalCollection: otherExternalCollection = [],
  // serve: whetherServe = false,
}) {
  const externals = [...externalCollection, ...(otherExternalCollection || [])];

  // const pxtoremConfig = {
  //   rootValue: pxToRemRoot,
  //   propList: ['*'],
  // };

  console.log({
    inputFile,
    terser: whetherTerser,
    externals,
    // pxtorem: pxtoremConfig,
  });

  const config = {
    external: (d) => {
      return (
        /^react$/.test(d) ||
        /^@tarojs\/taro$/.test(d) ||
        /^@tarojs\/taro-h5$/.test(d) ||
        d.includes('@babel/runtime')
      );
    },
    input: inputFile,
    plugins: [
      json(),
      url(),
      svgr(),
      resolve({
        preferBuiltins: false,
      }),
      commonjs({
        include: ['node_modules/**', '../../node_modules/**'],
      }),
      typescript({
        // check: true,
        // verbosity: 3,
        tsconfig: 'tsconfig.json',
      }),
      postcss({
        extensions: ['.css', '.scss', '.less'],
        use: ['sass', ['less', { javascriptEnabled: true }]],
        plugins: [
          autoprefixer(),
          // pxtorem(pxtoremConfig),
          cssnano(),
        ],
        inject: { insertAt: 'top' },
        extract: true,
      }),
      babelConfig({
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', 'ts', 'tsx'],
        babelHelpers: 'runtime',
      }),
    ],
    external: externals,
    output: {
      entryFileNames: '[name].js',
      dir: 'es',
      chunkFileNames: '[name].js',
      format: 'es',
      sourcemap: false,
    },
  };

  if (whetherTerser) {
    config.plugins.push(terser());
  }

  // if (whetherServe) {
  //   config.plugins.push(livereload());

  //   config.plugins.push(serve(whetherServe));
  // }

  return config;
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
