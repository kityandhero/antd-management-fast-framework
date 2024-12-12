import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  searchCardConfig,
} from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { SelectDrawerField } from '../../SmsCategory/SelectDrawerField';
import { parseUrlParametersForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ smsCategoryStatistic, schedulingControl }) => ({
  smsCategoryStatistic,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.smsCategoryStatistic.pageList.paramsKey,
      pageTitle: '分类短信发送总量统计列表',
      loadApiPath: 'smsCategoryStatistic/pageList',
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

  handleSearchResetState = () => {
    return {
      smsCategoryId: '',
      smsCategoryName: '',
    };
  };

  afterSmsCategorySelect = (d) => {
    const smsCategoryId = getValueByKey({
      data: d,
      key: fieldData.smsCategoryId.name,
    });

    const smsCategoryName = getValueByKey({
      data: d,
      key: fieldData.smsCategoryName.name,
    });

    this.setState({
      smsCategoryId: smsCategoryId,
      smsCategoryName: smsCategoryName,
    });
  };

  afterSmsCategoryClearSelect = () => {
    this.setState({
      smsCategoryId: '',
      smsCategoryName: '',
    });
  };

  establishSearchCardConfig = () => {
    const { loadSuccess, smsCategoryName } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: (
            <SelectDrawerField
              loadSuccess={loadSuccess}
              label={fieldData.smsCategoryName.label}
              smsCategoryName={smsCategoryName || ''}
              helper={fieldData.smsCategoryName.helper}
              afterSelect={(d) => {
                this.afterSmsCategorySelect(d);
              }}
              afterClearSelect={() => {
                this.afterSmsCategoryClearSelect();
              }}
            />
          ),
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
      dataTarget: fieldData.smsCategoryName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return value === '' ? '无类别' : value;
      },
    },
    {
      dataTarget: fieldData.totalCount,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.smsCategoryStatisticId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.smsCategoryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.updateTime,
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
