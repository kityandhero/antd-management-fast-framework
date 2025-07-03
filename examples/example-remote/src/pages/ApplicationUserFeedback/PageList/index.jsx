import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { refreshCacheAction, removeAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ applicationUserFeedback, schedulingControl }) => ({
  applicationUserFeedback,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.applicationUserFeedback.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1750,
      pageTitle: '用户反馈列表',
      paramsKey: accessWayCollection.applicationUserFeedback.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.applicationUserFeedbackTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);
        break;
      }

      case 'showPreviewDrawer': {
        this.showPreviewDrawer(handleData);
        break;
      }

      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (o) => {
    refreshCacheAction({
      target: this,
      handleData: o,
    });
  };

  remove = (o) => {
    removeAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  showPreviewDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        PreviewDrawer.open();
      },
    );
  };

  goToEdit = (record) => {
    const applicationUserFeedbackId = getValueByKey({
      data: record,
      key: fieldData.applicationUserFeedbackId.name,
      defaultValue: '',
    });

    this.goToPath(
      `/applicationFeedback/applicationUserFeedback/edit/load/${applicationUserFeedbackId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    const that = this;

    return {
      size: 'small',
      text: '查阅',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.applicationUserFeedback.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        that.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        that.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'goToEdit',
          icon: iconBuilder.edit(),
          text: '查看详情',
          hidden: !checkHasAuthority(
            accessWayCollection.applicationUserFeedback.get.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
          hidden: !checkHasAuthority(
            accessWayCollection.applicationUserFeedback.pageListOperateLog
              .permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.applicationUserFeedback.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除',
          hidden: !checkHasAuthority(
            accessWayCollection.applicationUserFeedback.remove.permission,
          ),
          confirm: true,
          title: '即将此消息，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userFriendlyName,
      width: 120,
      align: 'center',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userPhone,
      width: 120,
      align: 'center',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherReplyNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const whetherReply = getValueByKey({
          data: o,
          key: fieldData.whetherReply.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(whetherReply) * 25 + 47,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.applicationName,
      width: 200,
      align: 'center',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channelNote,
      width: 200,
      align: 'center',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.applicationUserFeedbackId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PreviewDrawer externalData={currentRecord} maskClosable />

        <OperateLogDrawer externalData={currentRecord} maskClosable />
      </>
    );
  };
}

export default PageList;
