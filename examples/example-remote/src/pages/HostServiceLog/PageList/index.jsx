import { connect } from 'easy-soft-dva';
import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  getHostServiceChangeTypeName,
  renderFormHostServiceChangeTypeSelect,
} from '../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ hostServiceLog, schedulingControl }) => ({
  hostServiceLog,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.hostServiceLog.pageList.paramsKey,
      pageTitle: '驻留服务变动记录',
      loadApiPath: 'hostServiceLog/pageList',
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

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderFormHostServiceChangeTypeSelect({}),
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
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.serviceChannel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.changeType,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 10 + 1,
          }),
        };
      },
      formatValue: (value) => {
        return getHostServiceChangeTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.hostServiceLogId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.ip,
      width: 140,
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
      dataTarget: fieldData.autoRemark,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      fixed: 'right',
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export default PageList;
