const { REACT_APP_ENV } = process.env;

export const configGeneral = {
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
    antd: true,
    baseNavigator: true,
  },
  targets: {
    ie: 11,
  },
  title: false,
  theme: {
    '@border-radius-base': '4px',
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  manifest: {
    basePath: '/',
  },
  history: {
    type: 'hash',
  },
  ssr: false,
  mfsu: {},
  fastRefresh: {},
  extraCustomOption: {
    babelCompact: false,
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
