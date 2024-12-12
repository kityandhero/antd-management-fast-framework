import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  DataTabContainerSupplement,
  getHostServiceStatusName,
} from '../../../customSpecialComponents';
import { setStartAction, setStopAction } from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { showOperateMessage } from '../Assist/tools';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ hostService, schedulingControl }) => ({
  hostService,
  schedulingControl,
}))
class Index extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'changeRecord/list',
      tab: '变动记录',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'hostService/get',
      backPath: `/service/hostService/pageList/key`,
      hostServiceId: null,
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
    const { hostServiceId } = this.state;

    d.hostServiceId = hostServiceId;

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
        key: fieldData.name.name,
      }),
    });
  };

  setStart = (r) => {
    setStartAction({
      target: this,
      handleData: r,
      successCallback: () => {
        showOperateMessage();
      },
    });
  };

  setStop = (r) => {
    setStopAction({
      target: this,
      handleData: r,
      successCallback: () => {
        showOperateMessage();
      },
    });
  };

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.apartment() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '服务名称';
  };

  establishPageHeaderTagCollectionConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const statusNote = getHostServiceStatusName({
      value: status,
    });

    return [
      {
        color: 'blue',
        text: statusNote,
        hidden: status !== statusCollection.start,
      },
      {
        color: 'green',
        text: statusNote,
        hidden: status !== statusCollection.stop,
      },
    ];
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'setStart',
          text: '启用服务',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setStart(handleData);
          },
          disabled: status === statusCollection.start,
          confirm: true,
          title: '即将启动服务，确定吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '停止服务',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setStop(handleData);
          },
          disabled: status === statusCollection.stop,
          confirm: true,
          title: '即将停止服务，确定吗？',
          handleData: metaData,
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getHostServiceStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
        }),
      }),
      timeLabel: fieldData.updateTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.updateTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    return [
      {
        label: fieldData.hostServiceId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.hostServiceId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.name.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.name.name,
        }),
      },
      {
        label: fieldData.ip.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.ip.name,
        }),
      },
      {
        label: fieldData.createTime.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.createTime.name,
          format: formatCollection.datetime,
        }),
      },
    ];
  };
}

export default Index;
