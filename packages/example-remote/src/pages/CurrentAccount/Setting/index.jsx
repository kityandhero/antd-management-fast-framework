import { connect } from 'easy-soft-dva';

import { DataMenuContainer } from 'antd-management-fast-framework';

@connect(({ currentAccount, schedulingControl }) => ({
  currentAccount,
  schedulingControl,
}))
class Setting extends DataMenuContainer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  menuList = [
    {
      key: 'basicInfo',
      defaultSelect: true,
      text: '基本信息',
    },
    {
      key: 'password',
      text: '更改密码',
    },
  ];
}

export default Setting;
