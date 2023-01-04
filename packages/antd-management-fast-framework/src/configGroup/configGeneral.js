// import { defineConfig, utils } from 'umi';

// import { webpackPlugin5 } from './webpackPlugin';

// const { winPath } = utils;

// import pk from './package.json';

// const deps = pk.dependencies;

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

// export function buildConfig({
//   routes,
//   loading = '@/components/PageLoading/index',
//   headerExtraLinks = [],
//   mfsu = true,
//   proxy = null,
// }) {
//   const c = {
//     ...configGeneral,
//     ...{
//       dynamicImport: {
//         loading,
//       },
//       routes,
//       cssLoader: {
//         modules: {
//           getLocalIdent: (context, _, localName) => {
//             if (
//               context.resourcePath.includes('node_modules') ||
//               context.resourcePath.includes('ant.design.pro.less') ||
//               context.resourcePath.includes('global.less')
//             ) {
//               return localName;
//             }
//             const match = context.resourcePath.match(/src(.*)/);
//             if (match && match[1]) {
//               const antdProPath = match[1].replace('.less', '');
//               const arr = winPath(antdProPath)
//                 .split('/')
//                 .map((a) => a.replace(/([A-Z])/g, '-$1'))
//                 .map((a) => a.toLowerCase());
//               return `antd-pro${arr.join('-')}-${localName}`.replace(
//                 /--/g,
//                 '-',
//               );
//             }
//             return localName;
//           },
//         },
//       },
//     },
//     ...{
//       chainWebpack: webpackPlugin5,
//     },
//     ...((proxy || null) == null
//       ? {}
//       : {
//           proxy,
//         }),
//     ...(mfsu
//       ? {
//           mfsu: {},
//         }
//       : {
//           mfsu: false,
//         }),
//     ...{
//       extraCustomOption: {
//         headerExtraLinks: [...headerExtraLinks],
//         babelCompact: false,
//       },
//     },
//   };

//   return defineConfig(c);
// }

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
