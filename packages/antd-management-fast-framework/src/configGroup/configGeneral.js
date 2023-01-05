export function buildConfig(packageImport) {
  const deps = packageImport.dependencies;

  return {
    mfsu: {
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    },
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
      baseSeparator: '-',
    },
    layout: {},
  };
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
