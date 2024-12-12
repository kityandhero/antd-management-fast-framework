import { connect } from 'easy-soft-dva';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { getGalleryCategoryStatusName } from '../../../customSpecialComponents';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageSelectModal } = DataMultiPageView;

const visibleFlag = '8bba4702fc574b28b7252f5642cdcda0';

@connect(({ galleryCategory, schedulingControl }) => ({
  galleryCategory,
  schedulingControl,
}))
class PageListSelectModal extends MultiPageSelectModal {
  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '展示图类别选择列表',
      loadApiPath: 'galleryCategory/pageList',
      listViewMode: listViewConfig.viewMode.table,
      tableScrollX: 1020,
    };
  }

  // 配置搜索框
  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  // 配置 table 显示模式数据列
  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getGalleryCategoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.galleryCategoryId,
      width: 140,
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
}

export { PageListSelectModal };
