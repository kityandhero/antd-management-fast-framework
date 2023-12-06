import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getSmsLogAggregateName,
  getSmsLogStatusName,
  renderSearchSmsLogAggregateSelect,
  renderSearchSmsLogStatusSelect,
} from '../../../customSpecialComponents';
import { SelectDrawerField } from '../../SmsCategory/SelectDrawerField';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getAggregateBadge, getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ smsLog, schedulingControl }) => ({
  smsLog,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.smsLog.pageList.paramsKey,
      pageTitle: '短信发送列表',
      loadApiPath: 'smsLog/pageList',
      // tableScrollX: 1800,
      smsCategoryId: unlimitedWithStringFlag.flag,
      smsCategoryName: '',
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

  adjustLoadRequestParams = (o) => {
    const { smsCategoryId } = this.state;
    const d = { smsCategoryId, ...o };

    if (checkStringIsNullOrWhiteSpace(smsCategoryId || '')) {
      delete d.smsCategoryId;
    }

    return d;
  };

  handleAdditionalSearchReset = () => {
    this.setState({
      smsCategoryId: unlimitedWithStringFlag.flag,
      smsCategoryName: '',
    });
  };

  afterSmsCategorySelect = (d) => {
    const { smsCategoryId, name: smsCategoryName } = d;

    this.setState({
      smsCategoryId: smsCategoryId || '',
      smsCategoryName: smsCategoryName || '',
    });
  };

  afterSmsCategoryClearSelect = () => {
    this.setState({
      smsCategoryId: '',
      smsCategoryName: '',
    });
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;
    values[fieldData.aggregate.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: (
            <SelectDrawerField
              label={fieldData.smsCategoryName.label}
              text="选择文章【Modal】"
              labelWidth={90}
              helper={fieldData.smsCategoryName.helper}
              afterSelectSuccess={(d) => {
                this.afterSelect(d);
              }}
              afterClearSelect={this.clearSelect}
            />
          ),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchSmsLogStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchSmsLogAggregateSelect({}),
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
      dataTarget: fieldData.content,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.smsCategoryName,
      width: 160,
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
          text: getSmsLogStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.sendTime,
      width: 160,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.aggregate,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getAggregateBadge(value),
          text: getSmsLogAggregateName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.smsLogId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      sorter: false,
      fixed: 'right',
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export default PageList;
