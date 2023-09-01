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
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-json',
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-url',
  '@svgr/rollup',
  '@tanem/react-nprogress',
  '@tinymce/tinymce-react',
  '@umijs/max',
  'antd',
  'antd/lib/config-provider/context',
  'array-move',
  'axios',
  'copy-to-clipboard',
  'easy-soft-dva',
  'easy-soft-utility',
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
  'react-color',
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
  'rc-util',
  'rc-util/es/composeProps',
  'path-to-regexp',
  'qs',
  'querystring',
  'queue',
  'dayjs',
  'monaco-editor',
  'moment',
  'node-cache',
  'numeral',
  'nzh',
  'rc-util/es/hooks/useMergedState',
  'react-redux',
  'redux',
  'redux-logger',
  'redux-thunk',
  'classnames',
  'dateformat',
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
