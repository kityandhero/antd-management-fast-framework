import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { defaultEmptyImage } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataTabContainer,
  refreshMetaData,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

@connect(({ currentManagement, schedulingControl }) => ({
  currentManagement,
  schedulingControl,
}))
class Setting extends DataTabContainer {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'fileStorageInfo',
      tab: '文件存储设置',
    },
    {
      key: 'smsInfo',
      tab: '短信配置',
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

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    return {
      buttons: [
        {
          key: 'refreshMetaData',
          text: '刷新元数据',
          icon: iconBuilder.redo(),
          // eslint-disable-next-line no-unused-vars
          handleButtonClick: ({ handleData }) => {
            refreshMetaData({});
          },
          handleData: metaData,
        },
      ],
    };
  };
}

export default Setting;
