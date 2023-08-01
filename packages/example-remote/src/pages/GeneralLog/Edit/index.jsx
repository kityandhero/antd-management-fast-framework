import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  DataTabContainerSupplement,
  getGeneralLogTypeName,
} from '../../../customSpecialComponents';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ generalLog, schedulingControl }) => ({
  generalLog,
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
      loadApiPath: 'generalLog/get',
      backPath: `/generalLog/pageList/key`,
      generalLogId: null,
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
    const { generalLogId } = this.state;

    d.generalLogId = generalLogId;

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
      textLabel: fieldData.type.label,
      text: getGeneralLogTypeName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.type.name,
          convert: convertCollection.number,
          defaultValue: '--',
        }),
      }),
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
        label: fieldData.generalLogId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.generalLogId.name,
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
