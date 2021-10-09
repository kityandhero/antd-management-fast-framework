import { connect } from 'umi';
import { FormOutlined } from '@ant-design/icons';

import {
  stringIsNullOrWhiteSpace,
  endsWith,
  removeEndMatch,
} from 'antd-management-fast-framework/es/utils/tools';
import DataMenuContainer from 'antd-management-fast-framework/es/framework/DataMenuContainer';

import { accessWayCollection } from '@/customConfig/config';

@connect(({ areaManager }) => ({
  areaManager,
}))
class Setting extends DataMenuContainer {
  menuList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.currentOperator.updateBasicInfo.permission),
      icon: <FormOutlined />,
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
