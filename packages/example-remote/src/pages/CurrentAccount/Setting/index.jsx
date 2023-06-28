import { connect } from 'easy-soft-dva';
import { getCurrentOperatorCache, getValueByKey } from 'easy-soft-utility';

import { defaultUserAvatar } from 'antd-management-fast-common';
import { DataMenuContainer } from 'antd-management-fast-framework';

@connect(({ currentAccount, schedulingControl }) => ({
  currentAccount,
  schedulingControl,
}))
class Setting extends DataMenuContainer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  showReloadButton = false;

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

  establishPageHeaderAvatarConfig = () => {
    const currentOperator = getCurrentOperatorCache();

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    return { src: avatar || defaultUserAvatar };
  };

  getPresetPageTitle = () => {
    const currentOperator = getCurrentOperatorCache();

    const name = getValueByKey({
      data: currentOperator,
      key: 'name',
      defaultValue: '--',
    });

    return name || '';
  };
}

export default Setting;
