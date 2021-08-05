import React from 'react';
import { connect } from 'umi';
import { Dropdown, Menu } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

import {
  columnFacadeMode,
  searchFormContentConfig,
} from 'antd-management-fast-framework/lib/utils/constants';
import MultiPage from 'antd-management-fast-framework/lib/framework/DataMultiPageView/MultiPage';
import IconInfo from 'antd-management-fast-framework/lib/customComponents/IconInfo';

import { renderSearchWebChannelSelect } from '../../../customSpecialComponents/FunctionSupplement/WebChannel';
import { fieldData } from '../Common/data';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class PageList extends MultiPage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '模块列表',
        paramsKey: '3c7c3102-ad12-47b4-86ef-7d38c855bddc',
        loadApiPath: 'accessWay/pageList',
        dateRangeFieldName: '生成时段',
      },
    };
  }

  getApiData = (props) => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  goToEdit = (record) => {
    const { accessWayId } = record;

    this.goToPath(`/permission/accessWay/edit/load/${accessWayId}/key/basicInfo`);
  };

  searchFormContentConfigData = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.component,
          component: renderSearchWebChannelSelect(),
        },
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.component,
          component: this.renderSimpleFormButtonCore(),
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
      formatValue: (val) => {
        return val === '' ? '' : val;
      },
    },
    {
      dataTarget: fieldData.relativePath,
      width: 300,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (val) => {
        return val === '' ? '' : val;
      },
    },
    {
      dataTarget: fieldData.guidTag,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.channel,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (val, record) => {
        return record.channelNote;
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 140,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (val, record) => {
        return record.channelNote;
      },
    },
    {
      dataTarget: fieldData.customOperate,
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            overlay={
              <Menu onClick={(e) => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="1">
                  <IconInfo icon={<DeleteOutlined />} text="删除" />
                </Menu.Item> */}
              </Menu>
            }
          >
            <IconInfo icon={<ReadOutlined />} text="详情" />
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default PageList;
