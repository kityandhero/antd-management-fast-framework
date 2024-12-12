import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getApplicationStatusName,
  getApplicationTypeName,
  renderSearchApplicationSourceStatusSelect,
  renderSearchApplicationSourceTypeSelect,
} from '../../../customSpecialComponents';
import { createModeCollection } from '../../ApplicationSource/Common/data';
import ApplicationSourcePageListDrawer from '../../ApplicationSource/PageListDrawer';
import { setOwnAction, setStartAction, setStopAction } from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, statusCollection, typeCollection } from '../Common/data';
import { TestSendWechatTemplateMessageModal } from '../TestSendWechatTemplateMessageModal';
import { TestSendWechatUniformMessageModal } from '../TestSendWechatUniformMessageModal';
import { UpdateMessageChannelApplicationInfoModal } from '../UpdateMessageChannelApplicationInfoModal';

const { MultiPage } = DataMultiPageView;

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1500,
      paramsKey: accessWayCollection.application.pageList.paramsKey,
      pageTitle: '应用列表',
      loadApiPath: 'application/pageList',
      currentRecord: null,
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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'updateMessageChannelApplicationInfo': {
        this.showUpdateMessageChannelApplicationInfoModal(handleData);
        break;
      }

      case 'testSendWechatTemplateMessage': {
        this.showTestSendWechatTemplateMessageModal(handleData);
        break;
      }

      case 'testSendWechatUniformMessage': {
        this.showTestSendWechatUniformMessageModal(handleData);
        break;
      }

      case 'setStart': {
        this.setStart(handleData);
        break;
      }

      case 'setStop': {
        this.setStop(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const applicationId = getValueByKey({
      data: handleData,
      key: fieldData.applicationId.name,
    });

    handleItem({
      target,
      value: applicationId,
      compareValueHandler: (o) => {
        const { applicationId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  setStop = (r) => {
    setStopAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setStart = (r) => {
    setStartAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOwn = (r) => {
    setOwnAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshData({});
      },
    });
  };

  showUpdateMessageChannelApplicationInfoModal = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        UpdateMessageChannelApplicationInfoModal.open();
      },
    );
  };

  afterUpdateMessageChannelApplicationInfoModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
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

  showApplicationSourcePageListDrawer = () => {
    ApplicationSourcePageListDrawer.open();
  };

  afterApplicationSourcePageListDrawerClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToEdit = (record) => {
    const applicationId = getValueByKey({
      data: record,
      key: fieldData.applicationId.name,
    });

    this.goToPath(`/app/application/edit/load/${applicationId}/key/basicInfo`);
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.type.name] = unlimitedWithStringFlag.flag;
    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.pauseCircle(),
        text: '开通应用',
        disabled: this.checkInProgress(),
        handleClick: this.showApplicationSourcePageListDrawer,
      },
    ];
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchApplicationSourceTypeSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchApplicationSourceStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    const type = getValueByKey({
      data: record,
      key: fieldData.type.name,
      convert: convertCollection.number,
    });

    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const whetherOwn = getValueByKey({
      data: record,
      key: fieldData.whetherOwn.name,
      convert: convertCollection.number,
    });

    return whetherOwn === whetherNumber.no
      ? {
          size: 'small',
          icon: iconBuilder.cloudDownload(),
          text: '立即开通',
          handleButtonClick: () => {
            this.setOwn(record);
          },
          confirm: true,
          title: '立即开通应用程序，确定吗？',
        }
      : {
          size: 'small',
          text: '修改',
          icon: iconBuilder.edit(),
          disabled: !checkHasAuthority(
            accessWayCollection.application.get.permission,
          ),
          handleButtonClick: ({ handleData }) => {
            this.goToEdit(handleData);
          },
          handleData: record,
          handleMenuClick: ({ key, handleData }) => {
            this.handleMenuClick({ key, handleData });
          },
          items: [
            {
              key: 'setStart',
              icon: iconBuilder.playCircle(),
              text: '启动应用',
              disabled: status === statusCollection.start,
              confirm: true,
              title: '即将启动应用，确定吗？',
            },
            {
              key: 'setStop',
              icon: iconBuilder.pauseCircle(),
              text: '停止应用',
              disabled: status === statusCollection.stop,
              confirm: true,
              title: '即将停止应用，确定吗？',
            },
            {
              key: 'updateMessageChannelApplicationInfo',
              withDivider: true,
              uponDivider: true,
              icon: iconBuilder.form(),
              text: '转发微信消息',
            },
            {
              key: 'testSendWechatTemplateMessage',
              withDivider: true,
              uponDivider: true,
              icon: iconBuilder.message(),
              text: '测试发送微信公众号模板消息',
            },
            {
              key: 'testSendWechatUniformMessage',
              withDivider: true,
              uponDivider: true,
              icon: iconBuilder.message(),
              hidden: type != typeCollection.weChatMiniProgram,
              text: '测试发送微信统一服务消息',
            },
          ],
        };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.logo,
      width: 80,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.shortName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.applicationSourceName,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.applicationKey,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.type,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 31,
          }),
        };
      },
      formatValue: (value) => {
        return getApplicationTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 140,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getApplicationStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.applicationId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <UpdateMessageChannelApplicationInfoModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateMessageChannelApplicationInfoModalOk();
          }}
        />

        <TestSendWechatTemplateMessageModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterTestSendWechatTemplateMessageModalOk();
          }}
        />

        <TestSendWechatUniformMessageModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterTestSendWechatUniformMessageModalOk();
          }}
        />

        <ApplicationSourcePageListDrawer
          externalData={{
            ...currentRecord,
            own: 0,
            createMode: createModeCollection.onlyDirectlyCreate,
          }}
          afterClose={() => {
            this.afterApplicationSourcePageListDrawerClose();
          }}
        />
      </>
    );
  };
}

export default PageList;
