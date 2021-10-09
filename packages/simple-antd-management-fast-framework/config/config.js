import { defineConfig, utils } from 'umi';

import proxy from './proxy';
import pageRoutes from './router.config';
import { webpackPlugin5 } from './plugin.config';

const { winPath } = utils;

const corsTargetDomain = '';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // plugins,
  hash: true,
  alias: {},
  antd: {
    // dark: true,
  },
  analytics: false,
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  favicon: `${corsTargetDomain}/assists/image/favicon.ico`,
  headScripts: [
    {
      src: `${corsTargetDomain}/interactionConfig/init.js`,
    },
  ],
  targets: {
    ie: 11,
  },
  routes: pageRoutes,
  title: false,
  theme: {
    // '@primary-color': '#F5222D',
    '@border-radius-base': '4px',
  },
  define: {
    corsTargetDomain,
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
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
  manifest: {
    basePath: '/',
  },
  history: {
    type: 'hash',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // chainWebpack: webpackPlugin5,
  ssr: false,
  // mfsu: {},
  // webpack5: {},
  // esbuild: {},
  fastRefresh: {},
  exportStatic: {},
  extraCustomOption: {
    headerExtraLinks: ['/home.css'],
    babelCompact: false,
  },
});
