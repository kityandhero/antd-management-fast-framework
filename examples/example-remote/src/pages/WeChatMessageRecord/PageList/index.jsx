import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  getWeChatMessageRecordSendStatusName,
  renderSearchWeChatMessageRecordSendStatusSelect,
} from '../../../customSpecialComponents';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import PreviewDrawer from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ weChatMessageRecord, schedulingControl }) => ({
  weChatMessageRecord,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '微信消息发送列表',
      paramsKey: accessWayCollection.weChatMessageRecord.pageList.paramsKey,
      loadApiPath: 'weChatMessageRecord/pageList',
      dateRangeFieldName: '发生时段',
      currentRecord: null,
    };
  }

  showDataPreviewDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        PreviewDrawer.open();
      },
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.userId,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.openId,
        },
        {
          lg: 12,
          type: searchCardConfig.contentItemType.customRangePicker,
          dateRangeFieldName,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchWeChatMessageRecordSendStatusSelect({}),
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
    return {
      size: 'small',
      text: '简要预览',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.weChatMessageRecord.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showDataPreviewDrawer(handleData);
      },
      handleData: record,
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.jsonData,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return value === '' ? '无' : value;
      },
    },
    {
      dataTarget: fieldData.status,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getWeChatMessageRecordSendStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.weChatMessageRecordId,
      width: 160,
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
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return <PreviewDrawer data={currentRecord} />;
  };
}

export default PageList;
