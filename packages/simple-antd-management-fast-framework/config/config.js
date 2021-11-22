import { defineConfig, utils } from 'umi';

import { configGeneral } from 'antd-management-fast-framework/es/configGroup/configGeneral';
import { webpackPlugin5 } from 'antd-management-fast-framework/es/configGroup/webpackPlugin';

import proxy from './proxy';
import pageRoutes from './router.config';

const { winPath } = utils;

const { REACT_APP_ENV } = process.env;

const c = {
  ...configGeneral,
  ...{
    dynamicImport: {
      loading: '@/components/PageLoading/index',
    },
    routes: pageRoutes,
    cssLoader: {
      modules: {
        getLocalIdent: (context, _, localName) => {
          if (
            context.resourcePath.includes('node_modules') ||
            context.resourcePath.includes('ant.design.pro.less') ||
            context.resourcePath.includes('global.less')
          ) {
            return localName;
          }
          const match = context.resourcePath.match(/src(.*)/);
          if (match && match[1]) {
            const antdProPath = match[1].replace('.less', '');
            const arr = winPath(antdProPath)
              .split('/')
              .map((a) => a.replace(/([A-Z])/g, '-$1'))
              .map((a) => a.toLowerCase());
            return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
          }
          return localName;
        },
      },
    },
    proxy: proxy[REACT_APP_ENV || 'dev'],
    mfsu: false,
    // chainWebpack: webpackPlugin5,
    extraCustomOption: {
      headerExtraLinks: ['/home.css'],
      babelCompact: false,
    },
  },
};

export default defineConfig(c);

// export default defineConfig({
//   // plugins,
//   hash: true,
//   alias: {},
//   antd: {
//     // dark: true,
//   },
//   analytics: false,
//   dva: {
//     hmr: true,
//   },
//   locale: {
//     default: 'zh-CN',
//     // default true, when it is true, will use `navigator.language` overwrite default
//     antd: true,
//     baseNavigator: true,
//   },
//   dynamicImport: {
//     loading: '@/components/PageLoading/index',
//   },
//   targets: {
//     ie: 11,
//   },
//   routes: pageRoutes,
//   title: false,
//   theme: {
//     // '@primary-color': '#F5222D',
//     '@border-radius-base': '4px',
//   },
//   define: {
//     REACT_APP_ENV: REACT_APP_ENV || false,
//   },
//   ignoreMomentLocale: true,
//   lessLoader: {
//     javascriptEnabled: true,
//   },
//   cssLoader: {
//     modules: {
//       getLocalIdent: (context, _, localName) => {
//         if (
//           context.resourcePath.includes('node_modules') ||
//           context.resourcePath.includes('ant.design.pro.less') ||
//           context.resourcePath.includes('global.less')
//         ) {
//           return localName;
//         }
//         const match = context.resourcePath.match(/src(.*)/);
//         if (match && match[1]) {
//           const antdProPath = match[1].replace('.less', '');
//           const arr = winPath(antdProPath)
//             .split('/')
//             .map((a) => a.replace(/([A-Z])/g, '-$1'))
//             .map((a) => a.toLowerCase());
//           return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
//         }
//         return localName;
//       },
//     },
//   },
//   manifest: {
//     basePath: '/',
//   },
//   history: {
//     type: 'hash',
//   },
//   proxy: proxy[REACT_APP_ENV || 'dev'],
//   // chainWebpack: webpackPlugin5,
//   ssr: false,
//   // mfsu: {},
//   // webpack5: {},
//   // esbuild: {},
//   fastRefresh: {},
//   // exportStatic: {},
//   extraCustomOption: {
//     headerExtraLinks: ['/home.css'],
//     babelCompact: false,
//   },
// });
