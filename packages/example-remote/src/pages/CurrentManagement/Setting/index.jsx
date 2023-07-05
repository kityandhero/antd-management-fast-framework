import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { defaultEmptyImage } from 'antd-management-fast-common';
import { DataTabContainer } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

@connect(({ currentManagement, schedulingControl }) => ({
  currentManagement,
  schedulingControl,
}))
class Setting extends DataTabContainer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'fileStorageInfo',
      tab: '文件存储设置',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'currentManagement/get',
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      }),
    });
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const logo = getValueByKey({
      data: metaData,
      key: fieldData.logo.name,
    });

    return { src: logo || defaultEmptyImage };
  };

  establishPageHeaderTitlePrefix = () => {
    return '系统名';
  };
}

export default Setting;
