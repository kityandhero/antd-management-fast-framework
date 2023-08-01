import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getApplicationSourceStatusName,
  getApplicationTypeName,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setStartAction,
  setStopAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';
import { TestSendWechatTemplateMessageModal } from '../TestSendWechatTemplateMessageModal';
import { TestSendWechatUniformMessageModal } from '../TestSendWechatUniformMessageModal';
import { UpdateMessageChannelApplicationInfoModal } from '../UpdateMessageChannelApplicationInfoModal';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.application.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'applicationNavigation/pageList',
      tab: '导航配置',
    },
    {
      key: 'customGlobalDataInfo',
      tab: '自定义全局数据',
    },
    {
      key: 'pagePathInfo',
      tab: '页面路径设置',
    },
    {
      key: 'weChatApplicationInfo',
      tab: '微信应用配置',
    },
    {
      key: 'weChatPayCertificateInfo',
      tab: '微信支付配置',
    },
    {
      key: 'weChatMessageTemplateInfo',
      tab: '微信消息模板配置',
    },
    {
      key: 'weChatMessageTargetPathInfo',
      tab: '微信消息跳转配置',
    },
    {
      key: 'articleNotificationInfo',
      tab: '文章推送设置',
    },
    {
      key: 'checkInInfo',
      tab: '签到打卡设置',
    },
    {
      key: 'operateLog/pageList',
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'application/get',
      backPath: `/app/application/pageList/key`,
      applicationId: null,
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
    const { applicationId } = this.state;

    d.applicationId = applicationId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
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
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setStop = (r) => {
    setStopAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showUpdateMessageChannelApplicationInfoModal = () => {
    UpdateMessageChannelApplicationInfoModal.open();
  };

  showTestSendWechatTemplateMessageModal = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        TestSendWechatTemplateMessageModal.open();
      },
    );
  };

  showTestSendWechatUniformMessageModal = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        TestSendWechatUniformMessageModal.open();
      },
    );
  };

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.fork() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '应用源名称';
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

    const statusNote = getApplicationSourceStatusName({
      value: status,
    });

    return [
      {
        color: 'blue',
        text: statusNote,
        hidden: status !== statusCollection.disable,
      },
      {
        color: 'green',
        text: statusNote,
        hidden: status !== statusCollection.enable,
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
          text: '启动应用',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setStart(handleData);
          },
          disabled: status === statusCollection.start,
          confirm: {
            title: '即将启动应用，确定吗？',
          },
          handleData: metaData,
        },
        {
          key: 'setStop',
          text: '停止应用',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setStop(handleData);
          },
          disabled: status === statusCollection.stop,
          confirm: {
            title: '即将停止应用，确定吗？',
          },
          handleData: metaData,
        },
        {
          key: 'updateMessageChannelApplicationInfo',
          text: '转发微信消息',
          icon: iconBuilder.form(),
          handleButtonClick: () => {
            that.showUpdateMessageChannelApplicationInfoModal();
          },
          handleData: metaData,
        },
        {
          key: 'testSendWechatTemplateMessage',
          text: '测试微信公众号模板消息',
          icon: iconBuilder.message(),
          handleButtonClick: () => {
            that.showTestSendWechatTemplateMessageModal();
          },
          handleData: metaData,
        },
        {
          key: 'testSendWechatUniformMessage',
          text: '测试微信统一服务消息',
          icon: iconBuilder.message(),
          handleButtonClick: () => {
            that.showTestSendWechatUniformMessageModal();
          },
          handleData: metaData,
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: {
            title: '即将刷新缓存，确定吗？',
          },
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getApplicationSourceStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
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
        label: fieldData.applicationId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.applicationId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.shortName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.shortName.name,
        }),
      },
      {
        label: fieldData.applicationSourceName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.applicationSourceName.name,
        }),
      },
      {
        label: fieldData.type.label,
        value: getApplicationTypeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.type.name,
          }),
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <UpdateMessageChannelApplicationInfoModal
          externalData={metaData}
          afterOK={() => {
            this.afterUpdateMessageChannelApplicationInfoModalOk();
          }}
        />

        <TestSendWechatTemplateMessageModal
          externalData={metaData}
          afterOK={() => {
            this.afterTestSendWechatTemplateMessageModalOk();
          }}
        />

        <TestSendWechatUniformMessageModal
          externalData={metaData}
          afterOK={() => {
            this.afterTestSendWechatUniformMessageModalOk();
          }}
        />
      </>
    );
  };
}

export default Edit;
