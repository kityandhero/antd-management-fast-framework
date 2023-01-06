import { applicationInit } from 'antd-management-fast-framework/es/utils/bootstrap';
import { loadMetaData } from 'antd-management-fast-framework/es/utils/metaDataAssist';

import { getLogo } from './utils/tools';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

export const layout = () => {
  applicationInit();

  return {
    logo: getLogo(),
    menu: {
      locale: false,
    },
  };
};
