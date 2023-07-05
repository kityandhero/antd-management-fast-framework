import React from 'react';

import { checkHasAuthority } from 'easy-soft-utility';

import {
  columnFacadeMode,
  dataTypeCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  DataPreviewDrawer,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData } from '../Common/data';

const { InnerMultiPage } = DataMultiPageView;

class BaseInnerOperationLogPageList extends InnerMultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '日志列表',
      currentRecord: null,
    };
  }

  openDataPreviewDrawer = (data) => {
    this.setState({ currentRecord: data }, () => {
      DataPreviewDrawer.open();
    });
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.operationLog.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.openDataPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: () => {},
      items: [],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 180,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.content,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.primaryKeyValue,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.operationLogId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
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

  renderPresetOther = () => {
    const { currentRecord } = this.state;
    const { title, contentType, content } = currentRecord || {
      title: '',
      contentType: dataTypeCollection.commonValue.flag,
      content: '',
    };

    return (
      <DataPreviewDrawer
        maskClosable
        title={title}
        dataType={contentType}
        data={content}
      />
    );
  };
}

export { BaseInnerOperationLogPageList };
