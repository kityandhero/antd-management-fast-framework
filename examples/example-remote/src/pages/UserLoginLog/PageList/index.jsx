import { connect } from 'easy-soft-dva';
import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  DataMultiPageView,
  DataPreviewDrawer,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getChannelName } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ userLoginLog, schedulingControl }) => ({
  userLoginLog,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  componentAuthority = accessWayCollection.userLoginLog.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '操作日志列表',
      paramsKey: accessWayCollection.userLoginLog.pageList.paramsKey,
      loadApiPath: 'userLoginLog/pageList',
      dateRangeFieldName: '创建时间',
    };
  }

  openDataPreviewDrawer = (data) => {
    this.setState({ currentRecord: data }, () => {
      DataPreviewDrawer.open();
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.account,
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
      dataTarget: fieldData.account,
      width: 180,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.location,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.ip,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 47,
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
      dataTarget: fieldData.createTime,
      width: 160,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export default PageList;
