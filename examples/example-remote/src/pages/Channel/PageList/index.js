import { connect } from 'easy-soft-dva';

import { searchCardConfig } from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ channel, schedulingControl }) => ({
  channel,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '渠道码列表',
      loadApiPath: 'channel/pageList',
    };
  }

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
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
      width: 280,
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
      dataTarget: fieldData.value,
      width: 280,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];
}

export default PageList;
