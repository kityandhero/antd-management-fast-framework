import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
  handleItem,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getBusinessModeName,
  getYonYouPushMessageStatusName,
} from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ yonYouPushMessage, schedulingControl }) => ({
  yonYouPushMessage,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.yonYouPushMessage.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用友消息推送列表',
      paramsKey: accessWayCollection.yonYouPushMessage.pageList.paramsKey,
      loadApiPath: 'yonYouPushMessage/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemSendComplete = ({ target, handleData, remoteData }) => {
    const yonYouPushMessageId = getValueByKey({
      data: handleData,
      key: fieldData.yonYouPushMessageId.name,
    });

    handleItem({
      target,
      value: yonYouPushMessageId,
      compareValueHandler: (o) => {
        const { yonYouPushMessageId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.sendComplete.name] = getValueByKey({
          data: remoteData,
          key: fieldData.sendComplete.name,
        });

        return d;
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);

        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showPreviewDrawer = (r) => {
    this.setState({ currentRecord: r }, () => {
      PreviewDrawer.open();
    });
  };

  goToEdit = (item) => {
    const yonYouPushMessageId = getValueByKey({
      data: item,
      key: fieldData.yonYouPushMessageId.name,
    });

    this.goToPath(
      `/messagePush/yonYouPushMessage/edit/load/${yonYouPushMessageId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.yonYouPushMessageId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.personnelCode,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.sendComplete,
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '摘要',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.yonYouPushMessage.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'goToEdit',
          icon: iconBuilder.read(),
          text: '详情',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
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
      dataTarget: fieldData.personnelCode,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.serialNumber,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.businessMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 9,
          }),
        };
      },
      formatValue: (value) => {
        return getBusinessModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.sendComplete,
      width: 100,
      align: 'center',
      render: (value) => (
        <>
          {toNumber(value) === 1
            ? iconBuilder.checkCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.closeCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )}
        </>
      ),
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getYonYouPushMessageStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.yonYouPushMessageId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.pushTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
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
        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
