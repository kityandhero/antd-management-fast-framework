import { connect } from 'easy-soft-dva';
import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import {
  columnFacadeMode,
  columnPlaceholder,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  renderSearchManagementChannelSelect,
} from '../../../customSpecialComponents';
import AccessWayCollectionPreviewDrawer from '../AccessWayCollectionPreviewDrawer';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.accessWay.pageList.paramsKey,
      pageTitle: '模块列表',
      loadApiPath: 'accessWay/pageList',
    };
  }

  showAccessWayCollectionPreviewDrawer = () => {
    AccessWayCollectionPreviewDrawer.open();
  };

  establishExtraActionGroupConfig = () => {
    const that = this;

    return {
      buttons: [
        {
          key: 'showAccessWayCollection',
          type: 'default',
          size: 'default',
          text: '显示路由',
          icon: iconBuilder.read(),
          handleButtonClick: () => {
            that.showAccessWayCollectionPreviewDrawer();
          },
          disabled: this.checkInProgress(),
        },
      ],
    };
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
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchManagementChannelSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 420,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.expand,
      width: 340,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.relativePath,
      width: 300,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 160,
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
        return getChannelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.guidTag,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    columnPlaceholder,
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  renderPresetOther = () => {
    return (
      <>
        <AccessWayCollectionPreviewDrawer maskClosable />
      </>
    );
  };
}

export default PageList;
