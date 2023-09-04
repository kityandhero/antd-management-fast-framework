/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * buildConfig
 */
function buildConfig({ packageJson: packageImport, config = {} }) {
  const deps = packageImport.dependencies;

  let mfsu = {};
  const shared = {};

  if (deps) {
    if (deps['react']) {
      shared.react = {
        singleton: true,
        eager: true,
        requiredVersion: deps['react'],
      };
    }

    if (deps['react-dom']) {
      shared['react-dom'] = {
        singleton: true,
        eager: true,
        requiredVersion: deps['react-dom'],
      };
    }

    mfsu.remotes = [];
    mfsu.shared = shared;
  }

  const mergeConfig = {
    mfsu,
    hash: true,
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    history: { type: 'hash' },
    locale: {
      // 默认使用 src/locales/zh-CN.ts 作为多语言文件
      default: 'zh-CN',
      antd: true,
      // default true, when it is true, will use `navigator.language` overwrite default
      baseNavigator: true,
    },
    layout: {},
    ...config,
  };

  delete mergeConfig.dva;

  return mergeConfig;
}

module.exports = { checkDevelopment, buildConfig };
