import path from 'path';

function getModulePackageName(module) {
  if (!module.context) return null;
  const nodeModulesPath = path.join(__dirname, '../node_modules/');

  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName = moduleDirName; // handle tree shaking

  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    const matchResult = packageName.match(/^_(@?[^@]+)/) || [];

    if (matchResult.length > 0) {
      packageName = packageName.match(/^_(@?[^@]+)/)[1];
    }
  }

  return packageName;
}

export const webpackPlugin = (config) => {
  // console.dir(config);
  // config.profile(true);

  // optimize chunks
  config.optimization
    // .minimize(process.env.NODE_ENV === 'production' ? true : false)
    // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      // minSize: 30000,
      // minChunks: 1, // 模块被引用>=1次，便分割
      // maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
      // maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
      maxInitialRequests: Infinity,
      cacheGroups: {
        // default: {
        //   // 模块缓存规则，设置为false，默认缓存组将禁用
        //   minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
        //   priority: -20, // 优先级
        //   reuseExistingChunk: true, // 默认使用已有的模块
        // },
        vendors: {
          test: (module) => {
            const packageName = getModulePackageName(module) || '';

            if (packageName) {
              return [
                'antd',
                'bizcharts',
                'gg-editor',
                'g6',
                '@antv',
                'l7',
                'gg-editor-core',
                'bizcharts-plugin-slider',
                'classnames',
                'lodash',
                'numeral',
              ].includes(packageName);
            }

            return false;
          },
          name(module) {
            const packageName = getModulePackageName(module);
            if (packageName) {
              if (
                [
                  'bizcharts',
                  '@antv/data-set',
                  '@ant-design/icons',
                  '@antv/l7',
                  '@antv/l7-maps',
                  'gg-editor',
                ].indexOf(packageName) >= 0
              ) {
                return 'viz'; // visualization package
              }
            }
            return 'misc';
          },
        },
      },
    });
};

export const webpackPlugin5 = (config, { env }) => {
  config.module
    .rule('mjs-rule')
    .test(/.m?js/)
    .resolve.set('fullySpecified', false);

  config.optimization.store.delete('noEmitOnErrors');

  console.log({
    currentEnv: env,
  });

  config.merge({
    // mode: 'development',
    optimization: {
      emitOnErrors: true,
      minimize: env === 'production',
      concatenateModules: env === 'production',
      splitChunks: {
        // chunks: 'async',
        // minSize: 1,
        // minChunks: 2,
        // automaticNameDelimiter: '.',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          viz: {
            test: (module) => {
              const packageName = getModulePackageName(module) || '';

              if (packageName) {
                return [
                  'antd',
                  'bizcharts',
                  'gg-editor',
                  'g6',
                  '@antv',
                  'l7',
                  'gg-editor-core',
                  'bizcharts-plugin-slider',
                  'classnames',
                  'lodash',
                  'numeral',
                ].includes(packageName);
              }

              return false;
            },
          },
          misc: {
            test: (module) => {
              const packageName = getModulePackageName(module) || '';

              if (packageName) {
                return ![
                  'antd',
                  'bizcharts',
                  'gg-editor',
                  'g6',
                  '@antv',
                  'l7',
                  'gg-editor-core',
                  'bizcharts-plugin-slider',
                  'classnames',
                  'lodash',
                  'numeral',
                ].includes(packageName);
              }

              return false;
            },
          },
        },
      },
    },
  });
};
