import { defineConfig, utils } from 'umi';

import proxy from './proxy';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';

const { winPath } = utils;

const corsTargetDomain = '';
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

export default defineConfig({
  //plugins,
  hash: true,
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
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  // Fast Refresh 热更新
  fastRefresh: {},
  //禁用umi.js内置的 title 渲染机制 https://github.com/ant-design/ant-design-pro/issues/6360
  title: false,
  theme: {
    '@primary-color': '#F5222D',
    '@border-radius-base': '4px',
  },
  define: {
    corsTargetDomain: corsTargetDomain,
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  // nodeModulesTransform: {
  //   type: 'none',
  //   exclude: [],
  // },
  // devtool: false,
  // devtool: process.env.NODE_ENV === 'production' ? false : 'eval',
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
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
  ssr: false,
  // mfsu: {},
  // webpack5: {},
  exportStatic: {},
  headerExtraLinks: ['/home.css'],
});
