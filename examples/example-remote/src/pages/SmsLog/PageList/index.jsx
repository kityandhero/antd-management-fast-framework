import React from 'react';

import { connect } from 'easy-soft-dva';
import { showSimpleErrorMessage, whetherNumber } from 'easy-soft-utility';

import {
  cardConfig,
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getSmsLogAggregateName,
  getSmsLogStatusName,
  renderSearchSmsLogAggregateSelect,
  renderSearchSmsLogStatusSelect,
} from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { singleTreeListAction } from '../../SmsCategory/Assist/action';
import { refreshCacheAction } from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getAggregateBadge, getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ smsLog, schedulingControl }) => ({
  smsLog,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.smsLog.pageList.paramsKey,
      pageTitle: '短信发送列表',
      loadApiPath: modelTypeCollection.smsLogTypeCollection.pageList,
      // tableScrollX: 1800,
      smsCategoryId: '',
      smsCategoryName: '',
      smsCategoryTreeData: [],
      currentRecord: null,
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

  doOtherRemoteRequest = () => {
    this.loadSmsCategoryTreeList({ refresh: whetherNumber.no });
  };

  loadSmsCategoryTreeList = ({ refresh = whetherNumber.no }) => {
    singleTreeListAction({
      target: this,
      handleData: { refresh },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          smsCategoryTreeData: remoteListData,
        });
      },
    });
  };

  reloadSmsCategoryTreeList = () => {
    this.loadSmsCategoryTreeList({ refresh: whetherNumber.yes });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { smsCategoryId } = this.state;

    d[fieldData.smsCategoryId.name] = smsCategoryId;

    return d;
  };

  handleSearchResetState = () => {
    return {
      smsCategoryId: '',
      smsCategoryName: '',
    };
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;
    values[fieldData.aggregate.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    const { smsCategoryTreeData, smsCategoryId } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: cardConfig.contentItemType.treeSelect,
          fieldData: fieldData.smsCategoryId,
          value: smsCategoryId,
          require: false,
          listData: smsCategoryTreeData,
          addonAfter: buildButton({
            text: '',
            icon: iconBuilder.reload(),
            handleClick: () => {
              this.reloadSmsCategoryTreeList();
            },
          }),
          dataConvert: (o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          },
          onChange: ({ value }) => {
            this.setState({
              smsCategoryId: value,
            });
          },
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

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.read(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '发送失败的短信不会重新发送。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
