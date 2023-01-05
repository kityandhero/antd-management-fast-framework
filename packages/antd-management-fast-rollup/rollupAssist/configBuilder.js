// import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
// import dts from 'rollup-plugin-dts';
// import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import nodePolyfills from 'rollup-plugin-polyfill-node';
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
  'antd-management-fast-common',
  'antd-management-fast-component',
  'antd-management-fast-framework',
  'array-move',
  'copy-to-clipboard',
  'd3-voronoi',
  'html-react-parser',
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
      return /^react$/.test(d) || d.includes('@babel/runtime');
    },
    input: inputFile,
    plugins: [
      json(),
      url(),
      svgr(),
      resolve({
        extensions: [
          '.js',
          '.jsx',
          '.es6',
          '.es',
          '.mjs',
          'ts',
          'tsx',
          '.mjs',
          '.node',
        ],
        preferBuiltins: false,
      }),
      nodePolyfills(),
      commonjs({
        include: ['node_modules/**', '../../node_modules/**'],
      }),
      typescript({
        check: true,
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
        modules: true,
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
    config.plugins.push(terser());
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
export function emptyExport() {
  return {};
}
