// import { defineConfig, utils } from 'umi';

// import { webpackPlugin5 } from './webpackPlugin';

// const { REACT_APP_ENV } = process.env;

// const { winPath } = utils;

export const configDefault = {
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  hash: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  dva: {},
  history: { type: 'hash' },
};

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
