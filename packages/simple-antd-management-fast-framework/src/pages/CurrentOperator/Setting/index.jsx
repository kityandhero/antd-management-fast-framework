import { connect } from 'umi';

import DataMenuContainer from 'antd-management-fast-framework/es/framework/DataMenuContainer';
import { iconCollection } from 'antd-management-fast-framework/es/utils/constants';

import { accessWayCollection } from '@/customConfig/config';

@connect(({ currentOperator }) => ({
  currentOperator,
}))
class Setting extends DataMenuContainer {
  menuList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.currentOperator.updateBasicInfo.permission),
      icon: iconCollection.form,
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
