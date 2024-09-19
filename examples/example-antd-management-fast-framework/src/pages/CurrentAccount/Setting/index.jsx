import { connect } from 'easy-soft-dva';
import { getCurrentOperatorCache, getValueByKey } from 'easy-soft-utility';

import { defaultUserAvatar } from 'antd-management-fast-common';
import { DataMenuContainer } from 'antd-management-fast-framework';

@connect(({ currentOperator, currentAccount, schedulingControl }) => ({
  currentOperator,
  currentAccount,
  schedulingControl,
}))
class Setting extends DataMenuContainer {
  showReloadButton = false;

  menuList = [
    {
      key: 'basicInfo',
      defaultSelect: true,
      text: '页面一',
    },
    {
      key: 'password',
      text: '页面二',
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
    });

    const loginName = getValueByKey({
      data: currentOperator,
      key: 'loginName',
    });

    return name || loginName || '';
  };
}

export default Setting;
