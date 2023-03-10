export function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export const configAssist = {
  showInfoComplete: false,
};

export function buildConfig({ packageJson: packageImport, config = {} }) {
  const deps = packageImport.dependencies;

  let mfsu = {};
  const shared = {};

  if (deps) {
    if (deps['react']) {
      shared.react = {
        singleton: true,
        requiredVersion: deps['react'],
      };
    }

    if (deps['react-dom']) {
      shared['react-dom'] = {
        singleton: true,
        requiredVersion: deps['react-dom'],
      };
    }

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
    dva: {},
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

  if (!configAssist.showInfoComplete) {
    console.log(mergeConfig);
    console.log('---------------------------------');

    configAssist.showInfoComplete = true;
  }

  return mergeConfig;
}
