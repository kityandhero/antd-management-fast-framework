import { connect } from 'easy-soft-dva';
import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import { columnFacadeMode } from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { getChannelName } from '../../../../customSpecialComponents';
import { fieldData } from '../../../MasterManagerLoginLog/Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ currentAccount, schedulingControl }) => ({
  currentAccount,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentAccount/pageListLoginLog',
      dateRangeFieldName: '操作时间',
    };
  }

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.account,
      width: 180,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.location,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.masterManagerId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
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
