import React from 'react';

import { getValueByKey, toNumber } from 'easy-soft-utility';

import {
  buildRandomHexColor,
  cardConfig,
  columnFacadeMode,
  dataTypeCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  DataPreviewDrawer,
} from 'antd-management-fast-framework';

import { getChannelName } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { InnerMultiPage } = DataMultiPageView;

class BaseInnerPageList extends InnerMultiPage {
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
      dataTarget: fieldData.operatorName,
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
        title="详细信息"
        descriptionLabel="简要描述"
        description={title}
        dataType={contentType}
        data={content}
        listData={[
          {
            title: {
              icon: iconBuilder.contacts(),
              text: '其他信息',
            },
            items: [
              {
                lg: 24,
                type: cardConfig.contentItemType.customGrid,
                list: [
                  {
                    label: fieldData.operatorId.label,
                    value: getValueByKey({
                      data: currentRecord,
                      key: fieldData.operatorId.name,
                    }),
                  },
                  {
                    label: fieldData.primaryKeyValue.label,
                    value: getValueByKey({
                      data: currentRecord,
                      key: fieldData.primaryKeyValue.name,
                    }),
                  },
                  {
                    label: fieldData.operationLogId.label,
                    value: getValueByKey({
                      data: currentRecord,
                      key: fieldData.operationLogId.name,
                    }),
                  },
                  {
                    label: fieldData.createTime.label,
                    value: getValueByKey({
                      data: currentRecord,
                      key: fieldData.createTime.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  size: 'small',
                  column: 2,
                  labelStyle: {
                    width: '90px',
                  },
                  emptyValue: '暂无',
                  ellipsis: false,
                },
              },
            ],
          },
        ]}
      />
    );
  };
}

export default BaseInnerPageList;
