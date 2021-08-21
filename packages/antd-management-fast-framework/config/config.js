import { defineConfig, utils } from 'umi';

const { winPath } = utils;

export default defineConfig({
  //plugins,
  hash: true,
  analytics: false,
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // Fast Refresh 热更新
  fastRefresh: {},
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
});
