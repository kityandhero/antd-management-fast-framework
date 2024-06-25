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

  let { mfsu } = {
    mfsu: false,
    ...config,
  };

  if (checkDevelopment()) {
    if (mfsu !== null && typeof mfsu === 'object') {
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

        mfsu.shared = {
          ...mfsu.shared,
          ...shared,
        };
      }
    } else {
      mfsu = false;
    }
  } else {
    mfsu = false;
  }

  const configAdjust = {
    ...config,
    mfsu,
  };

  const mergeConfig = {
    mfsu: false,
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
    esbuildMinifyIIFE: true,
    ...configAdjust,
  };

  delete mergeConfig.dva;

  return mergeConfig;
}

module.exports = { checkDevelopment, buildConfig };
