import React from 'react';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';

import { applicationInit } from 'antd-management-fast-framework/es/utils/bootstrap';

import { getLogo, getTitle } from './utils/tools';
import { defaultSettings } from './defaultSettings';

let setting = {
  fixSiderbar: true,
  layout: 'mix',
  splitMenus: true,
};

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

export function rootContainer(container) {
  return React.createElement(
    ProConfigProvider,
    null,
    container,
    <SettingDrawer
      // pathname={pathname}
      enableDarkTheme
      // getContainer={() => document.getElementById('test-pro-layout')}
      settings={setting}
      onSettingChange={(changeSetting) => {
        // setSetting(changeSetting);

        setting = changeSetting;
      }}
      disableUrlParams={false}
    />,
  );
}

export const layout = () => {
  applicationInit(defaultSettings);

  return {
    logo: getLogo(),
    title: getTitle(),
    menu: {
      locale: false,
    },
    ...setting,
  };
};
