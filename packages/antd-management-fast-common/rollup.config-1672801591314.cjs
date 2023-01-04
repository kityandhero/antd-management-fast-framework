'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('rollup-plugin-postcss');
var nodePolyfills = require('rollup-plugin-polyfill-node');
var rollupPluginTerser = require('rollup-plugin-terser');
var typescript = require('rollup-plugin-typescript2');
var babelConfig = require('@rollup/plugin-babel');
var commonjs = require('@rollup/plugin-commonjs');
var json = require('@rollup/plugin-json');
var resolve = require('@rollup/plugin-node-resolve');
var url = require('@rollup/plugin-url');
var svgr = require('@svgr/rollup');

// import pxtorem from 'postcss-pxtorem';

// import { pxToRemRoot } from '../../taro-fast-common/src/utils/constants';

const externalCollection = [
  '@ant-design/icons',
  '@ant-design/pro-layout',
  '@antv/data-set',
  '@antv/l7',
  '@antv/l7-maps',
  '@babel/runtime',
  '@babel/helpers',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-json',
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-url',
  '@svgr/rollup',
  '@tinymce/tinymce-react',
  '@umijs/max',
  'antd',
  'antd/lib/config-provider/context',
  'array-move',
  'copy-to-clipboard',
  'd3-voronoi',
  'rollup-plugin-typescript2',
  'rollup-plugin-postcss',
  'rollup-plugin-terser',
  'postcss-pxtorem',
  'autoprefixer',
  'babel-plugin-prismjs',
  'bizcharts',
  'cssnano',
  'flubber',
  'rc-animate',
  'rc-queue-anim',
  'rc-texty',
  'rc-tween-one',
  'react',
  'react-dnd',
  'react-dom',
  'react-intl',
  'react-dnd-html5-backend',
  'react-json-view',
  'react-player',
  'react-syntax-highlighter',
  'react/jsx-runtime',
  'lodash',
  'lodash.debounce',
  'randomcolor',
  'path-to-regexp',
  'qs',
  'querystring',
  'queue',
  'dayjs',
  'moment',
  'node-cache',
  'nprogress',
  'numeral',
  'nzh',
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
  'umi',
  'uuid',
];

function buildConfig$1({
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
      return /^react$/.test(d) || d.includes('@babel/runtime');
    },
    input: inputFile,
    plugins: [
      json(),
      url(),
      svgr(),
      resolve({
        preferBuiltins: false,
      }),
      nodePolyfills(),
      commonjs({
        include: ['node_modules/**', '../../node_modules/**'],
      }),
      typescript({
        // check: true,
        // verbosity: 3,
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfig: './tsconfig.json',
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
      // preserveModules: true,
    },
  };

  if (whetherTerser) {
    config.plugins.push(rollupPluginTerser.terser());
  }

  // if (whetherServe) {
  //   config.plugins.push(livereload());

  //   config.plugins.push(serve(whetherServe));
  // }

  return [
    config,
    // {
    //   input: ['./es/request.d.ts', './es/tools.d.ts'],
    //   output: {
    //     // entryFileNames: '[name].d.js',
    //     dir: 'dts',
    //   },
    //   plugins: [dts.default()],
    // },
  ];
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function emptyExport$1() {
  return {};
}

const inputFile = {
  ...{
    'utils/actionAssist': 'src/utils/actionAssist.js',
    'utils/appConfiguration': 'src/utils/appConfiguration.js',
    'utils/authority': 'src/utils/authority.js',
    'utils/cacheAssist': 'src/utils/cacheAssist.js',
    'utils/constants': 'src/utils/constants.js',
    'utils/core': 'src/utils/core.js',
    'utils/defaultSettingsSpecial': 'src/utils/defaultSettingsSpecial.js',
    'utils/developAssist': 'src/utils/developAssist.js',
    'utils/dva': 'src/utils/dva.js',
    'utils/globalModel': 'src/utils/globalModel.js',
    'utils/globalStorageAssist': 'src/utils/globalStorageAssist.js',
    'utils/localStorageAssist': 'src/utils/localStorageAssist.js',
    'utils/log': 'src/utils/log.js',
    'utils/mediaDefault': 'src/utils/mediaDefault.js',
    'utils/proLayoutCollection': 'src/utils/proLayoutCollection.jsx',
    'utils/request': 'src/utils/request.js',
    'utils/requestAssistor': 'src/utils/requestAssistor.js',
    'utils/sessionStorageAssist': 'src/utils/sessionStorageAssist.js',
    'utils/tools': 'src/utils/tools.js',
    'utils/typeCheck': 'src/utils/typeCheck.js',
    'utils/typeConvert': 'src/utils/typeConvert.js',
    'utils/virtualRequest': 'src/utils/virtualRequest.js',
  },
};

function buildConfig({ terser: whetherTerser = false }) {
  return buildConfig$1({ inputFile, terser: whetherTerser });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function emptyExport() {
  return {};
}

const config = buildConfig({ terser: false });

console.log({ message: 'rollup.config.skipCompression.js' });

exports.default = config;
