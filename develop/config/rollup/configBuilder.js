import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import babelConfig from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

const externalCollection = [
  '@ant-design/icons',
  '@ant-design/pro-layout',
  '@antv/data-set',
  '@antv/l7',
  '@antv/l7-maps',
  '@babel/helpers',
  '@babel/parser',
  '@babel/runtime',
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
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-json',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-url',
  '@svgr/rollup',
  '@tanem/react-nprogress',
  '@tinymce/tinymce-react',
  '@umijs/max',
  'antd',
  'antd/lib/config-provider/context',
  'array-move',
  'autoprefixer',
  'axios',
  'babel-plugin-prismjs',
  'bizcharts',
  'classnames',
  'copy-to-clipboard',
  'cssnano',
  'dateformat',
  'dayjs',
  'easy-soft-dva',
  'easy-soft-utility',
  'flatten',
  'flubber',
  'global',
  'html-react-parser',
  'invariant',
  'is-plain-object',
  'lodash',
  'lodash.debounce',
  'mm',
  'moment',
  'monaco-editor',
  'node-cache',
  'numeral',
  'nzh',
  'object-hash',
  'path-to-regexp',
  'postcss-pxtorem',
  'prismjs',
  'qs',
  'querystring',
  'queue',
  'randomcolor',
  'rc-animate',
  'rc-queue-anim',
  'rc-texty',
  'rc-tween-one',
  'rc-util',
  'rc-util/es/composeProps',
  'rc-util/es/hooks/useMergedState',
  'react',
  'react-color',
  'react-dnd',
  'react-dnd-html5-backend',
  'react-dom',
  'react-intl',
  'react-json-view',
  'react-player',
  'react-redux',
  'react-syntax-highlighter',
  'react-to-print',
  'react/jsx-runtime',
  'reactflow',
  'redux',
  'redux-logger',
  'redux-saga',
  'redux-thunk',
  'rollup-plugin-postcss',
  'rollup-plugin-terser',
  'rollup-plugin-typescript2',
  'umi',
  'uuid',
  'warning',
];

export function buildConfig({
  inputFile,
  terser: whetherTerser = false,
  externalCollection: otherExternalCollection = [],
  babelConfig: babelExtraConfig = {},
  postcssConfig = {},
}) {
  const externals = [...externalCollection, ...(otherExternalCollection || [])];

  const config = {
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
          '.ts',
          '.tsx',
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
        // check: true,
        // verbosity: 3,
        // clean: true,
        useTsconfigDeclarationDir: true,
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
        modules: true,
        ...postcssConfig,
      }),
      babelConfig({
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
              development: false,
            },
          ],
          '@babel/preset-env',
        ],
        plugins: [
          '@babel/plugin-transform-react-jsx',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-transform-private-methods', { loose: true }],
          [
            '@babel/plugin-transform-private-property-in-object',
            { loose: true },
          ],
          ['@babel/plugin-transform-class-properties', { loose: true }],
          '@babel/plugin-external-helpers',
          [
            '@babel/plugin-transform-runtime',
            {
              regenerator: true,
              helpers: true,
              version: '^7.7.7',
            },
          ],
        ],
        extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
        babelHelpers: 'runtime',
        ...babelExtraConfig,
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
    //   input: inputFile,
    //   plugins: [dts.default()],
    //   output: {
    //     format: 'esm',
    //     file: 'dist/index.d.ts',
    //   },
    // },
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
 */
export function emptyExport() {
  return {};
}
