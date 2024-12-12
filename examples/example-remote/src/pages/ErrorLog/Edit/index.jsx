import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  DataTabContainerSupplement,
  getErrorLogResolveName,
} from '../../../customSpecialComponents';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ errorLog, schedulingControl }) => ({
  errorLog,
  schedulingControl,
}))
class Index extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'paramInfo',
      tab: '参数信息',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'errorLog/get',
      backPath: `/logs/errorLog/pageList/key`,
      errorLogId: null,
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
    const { errorLogId } = this.state;

    d.errorLogId = errorLogId;

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

  goToPrev = (metaData) => {
    const { adjacentData } = metaData;

    if (adjacentData.prevExist) {
      this.goToPath(`/errorLog/edit/load/${adjacentData.prevId}/key/basicInfo`);
    }
  };

  goToNext = (metaData) => {
    const { adjacentData } = metaData;

    if (adjacentData.nextExist) {
      this.goToPath(`/errorLog/edit/load/${adjacentData.nextId}/key/basicInfo`);
    }
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;
    const buttons = [];

    if (metaData == null) {
      return null;
    }

    const { adjacentData } = {
      adjacentData: {},
      ...metaData,
    };

    const { prevExist, nextExist } = {
      prevExist: false,
      nextExist: false,
      ...adjacentData,
    };

    const that = this;

    buttons.push(
      {
        key: 'prev',
        type: 'default',
        size: 'default',
        text: '上一个',
        placement: 'bottomRight',
        icon: iconBuilder.leftCircle(),
        handleData: metaData,
        disabled: !prevExist,
        handleButtonClick: ({ handleData }) => {
          that.goToPrev(handleData);
        },
      },
      {
        key: 'next',
        type: 'default',
        size: 'default',
        text: '下一个',
        placement: 'bottomRight',
        icon: iconBuilder.rightCircle(),
        handleData: metaData,
        disabled: !nextExist,
        handleButtonClick: ({ handleData }) => {
          that.goToNext(handleData);
        },
      },
    );

    return {
      buttons,
    };
  };

  establishPageHeaderTitlePrefix = () => {
    return '异常';
  };

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.bug() };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.resolveNote.label,
      text: getErrorLogResolveName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.resolve.name,
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
        label: fieldData.errorLogId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.errorLogId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.typeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.typeNote.name,
        }),
      },
      {
        label: fieldData.channelNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.channelNote.name,
        }),
      },
      {
        label: fieldData.degreeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.degreeNote.name,
        }),
      },
      {
        label: fieldData.sendNotification.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.sendNotification.name,
        }),
      },
      {
        label: fieldData.sendTime.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.sendTime.name,
        }),
      },
    ];
  };
}

export default Index;
