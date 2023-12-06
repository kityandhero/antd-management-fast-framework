import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { DataTabContainerSupplement } from '../../../customSpecialComponents';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ executeLog, schedulingControl }) => ({
  executeLog,
  schedulingControl,
}))
class Index extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'executeLog/get',
      backPath: `/executeLog/pageList/key`,
      executeLogId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { executeLogId } = this.state;

    d.executeLogId = executeLogId;

    return d;
  };

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
        key: fieldData.message.name,
      }),
    });
  };

  establishPageHeaderTitlePrefix = () => {
    return '日志';
  };

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.message() };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '状态',
      text: '正常',
      timeLabel: fieldData.createTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.createTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    return [
      {
        label: fieldData.executeLogId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.executeLogId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.channelNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.channelNote.name,
        }),
      },
    ];
  };
}

export default Index;
