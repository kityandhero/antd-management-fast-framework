import { connect } from 'easy-soft-dva';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { getQrCodeCategoryStatusName } from '../../../customSpecialComponents';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '1a28441e01b44be8aedb15e6b4183db5';

@connect(({ qrCodeCategory, schedulingControl }) => ({
  qrCodeCategory,
  schedulingControl,
}))
class PageListDrawer extends MultiPageSelectDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 880,
      loadApiPath: 'qrCodeCategory/pageList',
    };
  }

  getPageName = () => {
    return '请选择类别';
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.description,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
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
          text: getQrCodeCategoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.qrCodeCategoryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 150,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export default PageListDrawer;
