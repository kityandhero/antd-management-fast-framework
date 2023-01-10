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
import { DEFAULT_EXTENSIONS } from '@babel/core';

// import { pxToRemRoot } from '../../taro-fast-common/src/utils/constants';

const externalCollection = [
  ...[
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
    'rc-util',
    'rc-util/es/composeProps',
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
  ],
  ...[
    'antd-management-fast-common',
    'antd-management-fast-common/es/customComponents',
    'antd-management-fast-common/es/customComponents/ComponentBase',
    'antd-management-fast-common/es/utils/actionAssist',
    'antd-management-fast-common/es/utils/appConfiguration',
    'antd-management-fast-common/es/utils/authority',
    'antd-management-fast-common/es/utils/constants',
    'antd-management-fast-common/es/utils/core',
    'antd-management-fast-common/es/utils/dynamicSetting',
    'antd-management-fast-common/es/utils/developAssist',
    'antd-management-fast-common/es/utils/dva',
    'antd-management-fast-common/es/utils/globalModel',
    'antd-management-fast-common/es/utils/globalStorageAssist',
    'antd-management-fast-common/es/utils/localStorageAssist',
    'antd-management-fast-common/es/utils/log',
    'antd-management-fast-common/es/utils/mediaDefault',
    'antd-management-fast-common/es/utils/proLayoutCollection',
    'antd-management-fast-common/es/utils/request',
    'antd-management-fast-common/es/utils/requestAssistor',
    'antd-management-fast-common/es/utils/sessionStorageAssist',
    'antd-management-fast-common/es/utils/tools',
    'antd-management-fast-common/es/utils/typeCheck',
    'antd-management-fast-common/es/utils/typeConvert',
    'antd-management-fast-common/es/utils/virtualRequest',
    'antd-management-fast-common/es/utils/routeAssist',
  ],
  ...[
    'antd-management-fast-component',
    'antd-management-fast-component/es/customComponents/ActiveChart',
    'antd-management-fast-component/es/customComponents/AudioUpload',
    'antd-management-fast-component/es/customComponents/ArticleListContent',
    'antd-management-fast-component/es/customComponents/BaseComponent',
    'antd-management-fast-component/es/customComponents/Canvas',
    'antd-management-fast-component/es/customComponents/AvatarList',
    'antd-management-fast-component/es/customComponents/Charts/autoHeight',
    'antd-management-fast-component/es/customComponents/Charts/bizcharts',
    'antd-management-fast-component/es/customComponents/Charts',
    'antd-management-fast-component/es/customComponents/Charts/Bar',
    'antd-management-fast-component/es/customComponents/Charts/ChartCard',
    'antd-management-fast-component/es/customComponents/Charts/Field',
    'antd-management-fast-component/es/customComponents/Charts/Gauge',
    'antd-management-fast-component/es/customComponents/Charts/MiniArea',
    'antd-management-fast-component/es/customComponents/Charts/MiniBar',
    'antd-management-fast-component/es/customComponents/Charts/MiniProgress',
    'antd-management-fast-component/es/customComponents/Charts/Pie',
    'antd-management-fast-component/es/customComponents/Charts/TagCloud',
    'antd-management-fast-component/es/customComponents/Charts/TimelineChart',
    'antd-management-fast-component/es/customComponents/Charts/WaterWave',
    'antd-management-fast-component/es/customComponents/CenterBox',
    'antd-management-fast-component/es/customComponents/DisplayCopyData',
    'antd-management-fast-component/es/customComponents/ColorText',
    'antd-management-fast-component/es/customComponents/DecorateAvatar',
    'antd-management-fast-component/es/customComponents/EditableItem',
    'antd-management-fast-component/es/customComponents/Editor/TinymceWrapper',
    'antd-management-fast-component/es/customComponents/EllipsisCustom',
    'antd-management-fast-component/es/customComponents/Ellipsis',
    'antd-management-fast-component/es/customComponents/EditableLinkGroup',
    'antd-management-fast-component/es/customComponents/EverySpace',
    'antd-management-fast-component/es/customComponents/Exception',
    'antd-management-fast-component/es/customComponents/FileUpload',
    'antd-management-fast-component/es/customComponents/Exception/typeConfig',
    'antd-management-fast-component/es/customComponents/FigureRange',
    'antd-management-fast-component/es/customComponents/FlexBox',
    'antd-management-fast-component/es/customComponents/FileBase64Upload',
    'antd-management-fast-component/es/customComponents/FlexText',
    'antd-management-fast-component/es/customComponents/FooterToolbar',
    'antd-management-fast-component/es/customComponents/FormCustom/FormCustomItem',
    'antd-management-fast-component/es/customComponents/FormCustom/FormCustomItemChildren',
    'antd-management-fast-component/es/customComponents/FromDisplayItem',
    'antd-management-fast-component/es/customComponents/FunctionComponent',
    'antd-management-fast-component/es/customComponents/HelpBox',
    'antd-management-fast-component/es/customComponents/HelpCard',
    'antd-management-fast-component/es/customComponents/GlobalFooter',
    'antd-management-fast-component/es/customComponents/Icon',
    'antd-management-fast-component/es/customComponents/IconFont',
    'antd-management-fast-component/es/customComponents/IconInfo',
    'antd-management-fast-component/es/customComponents/ImageBox',
    'antd-management-fast-component/es/customComponents/HtmlBox',
    'antd-management-fast-component/es/customComponents/ImageUpload',
    'antd-management-fast-component/es/customComponents/NoticeIconCustom',
    'antd-management-fast-component/es/customComponents/ImageContentPreview',
    'antd-management-fast-component/es/customComponents/NoticeIconCustom/NoticeList',
    'antd-management-fast-component/es/customComponents/NumberInfo',
    'antd-management-fast-component/es/customComponents/PageLoading',
    'antd-management-fast-component/es/customComponents/PercentageBox',
    'antd-management-fast-component/es/customComponents/PriceBox',
    'antd-management-fast-component/es/customComponents/StandardFormRow',
    'antd-management-fast-component/es/customComponents/Result',
    'antd-management-fast-component/es/customComponents/StandardTableCustom',
    'antd-management-fast-component/es/customComponents/StatusBar',
    'antd-management-fast-component/es/customComponents/TagSelect',
    'antd-management-fast-component/es/customComponents/TimeLineCustom',
    'antd-management-fast-component/es/customComponents/Trend',
    'antd-management-fast-component/es/customComponents/VerticalBox',
    'antd-management-fast-component/es/customComponents/VideoUpload',
    'antd-management-fast-component/es/customComponents/StandardTable',
    'antd-management-fast-component/es/customComponents/AnimalBox/FadeBox',
    'antd-management-fast-component/es/customComponents/AnimalBox/QueueListBox',
    'antd-management-fast-component/es/customComponents/AnimalBox/QueueBox',
    'antd-management-fast-component/es/customComponents/AnimalBox/RotateBox',
    'antd-management-fast-component/es/customComponents/Canvas',
    'antd-management-fast-component/es/customComponents/Canvas/Bubbly',
    'antd-management-fast-component/es/customComponents/Canvas/Core',
    'antd-management-fast-component/es/customComponents/Canvas/Spirit',
    'antd-management-fast-component/es/customComponents/Canvas/RadarScanning',
    'antd-management-fast-component/es/customComponents/FunctionSupplement/Whether',
    'antd-management-fast-component/es/customComponents/MobileContainor/ContentView',
    'antd-management-fast-component/es/customComponents/MobileContainor/MobileSimulation',
    'antd-management-fast-component/es/customComponents/MobileContainor/Devices/GalaxyNote8',
    'antd-management-fast-component/es/customComponents/MobileContainor/Devices/IPhone5S',
    'antd-management-fast-component/es/customComponents/MobileContainor/Devices/Iphone8',
    'antd-management-fast-component/es/customComponents/MobileContainor/Devices/Iphone8plus',
    'antd-management-fast-component/es/customComponents/MobileContainor/Devices/RoughSketch',
    'antd-management-fast-component/es/customComponents/MobileContainor/Devices/IphoneX',
  ],
  ...['antd-management-fast-framework'],
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
      }),
      babelConfig({
        extensions: [...DEFAULT_EXTENSIONS, ...['ts', 'tsx']],
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
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
