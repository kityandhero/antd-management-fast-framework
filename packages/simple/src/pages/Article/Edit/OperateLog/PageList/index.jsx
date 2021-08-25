import React from 'react';
import { connect } from 'umi';
import moment from 'moment';

import {
  copyToClipboard,
  replaceTargetText,
  getDerivedStateFromPropsForUrlParams,
} from 'antd-management-fast-framework/lib/utils/tools';
import { columnFacadeMode } from 'antd-management-fast-framework/lib/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import InnerMultiPage from 'antd-management-fast-framework/lib/framework/DataMultiPageView/InnerMultiPage';
import Ellipsis from 'antd-management-fast-framework/lib/customComponents/Ellipsis';
import EllipsisCustom from 'antd-management-fast-framework/lib/customComponents/EllipsisCustom';

import { fieldData } from '../../../../SystemLog/Common/data';
import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../../Assist/config';

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
class PageList extends InnerMultiPage {
  componentAuthority = accessWayCollection.merchant.pageListLog;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        paramsKey: '42d5ef88-85c0-448e-8ed2-7ad9e8988a6e',
        loadApiPath: 'merchant/pageListLog',
        dateRangeFieldName: '操作时间',
        merchantId: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = (props) => {
    const {
      merchant: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { merchantId } = this.state;

    d.merchantId = merchantId;

    return d;
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.content,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sysLogsId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.title,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.inTime,
      width: 180,
      fixed: 'right',
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export default PageList;
