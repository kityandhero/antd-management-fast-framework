import React from 'react';
import { SettingDrawer } from '@ant-design/pro-components';

import Bootstrap from 'antd-management-fast-framework/es/customComponents/Bootstrap';
import { getSetting } from 'antd-management-fast-framework/es/utils/settingAssist';

import Footer from './components/Footer';
import { getLogo, getTitle } from './utils/tools';

let setting = {};

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

// export function rootContainer(container) {
//   return React.createElement(
//     ProConfigProvider,
//     null,
//     <BootstrapLayout />,
//     container,
//   );
// }

export const layout = () => {
  return {
    logo: getLogo(),
    title: getTitle(),
    menu: {
      locale: false,
    },
    footerRender: () => <Footer />,
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}

          <Bootstrap />

          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={getSetting()}
              // onSettingChange={(settings) => {
              //   setInitialState((preInitialState) => ({
              //     ...preInitialState,
              //     settings,
              //   }));
              // }}
            />
          )}
        </>
      );
    },
    ...setting,
  };
};
