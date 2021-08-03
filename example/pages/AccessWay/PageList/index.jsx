import React from 'react';
import { connect } from 'umi';
import { Row, Col, Dropdown, Menu } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
} from 'antd-management-fast-framework/lib/utils/tools';
import { formNameCollection } from '@/customConfig/config';
import MultiPage from 'antd-management-fast-framework/lib/framework/DataMultiPageView/MultiPage';
import Ellipsis from 'antd-management-fast-framework/lib/customComponents/Ellipsis';
import EllipsisCustom from 'antd-management-fast-framework/lib/customComponents/EllipsisCustom';
import IconInfo from 'antd-management-fast-framework/lib/customComponents/IconInfo';

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

    this.goToPath(
      `/permission/accessWay/edit/load/${accessWayId}/key/basicInfo`,
    );
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={24}>
          <Col md={4} sm={24}>
            {this.renderSearchWebChannelSelect()}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.name.label,
      dataIndex: fieldData.name.name,
      align: 'left',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.relativePath.label,
      dataIndex: fieldData.relativePath.name,
      width: 300,
      align: 'left',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.guidTag.label,
      dataIndex: fieldData.guidTag.name,
      width: 120,
      align: 'center',
      render: (val) => (
        <>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </>
      ),
    },
    {
      title: fieldData.expand.label,
      dataIndex: fieldData.expand.name,
      width: 340,
      align: 'center',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    // {
    //   title:fieldData.accessWayId.label,
    //   dataIndex: fieldData.accessWayId.name,
    //   width: 120,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <EllipsisCustom
    //         tooltip
    //         lines={1}
    //         removeChildren
    //         extraContent={
    //           <>
    //             <a
    //               onClick={() => {
    //                 copyToClipboard(val);
    //               }}
    //             >
    //               {replaceTargetText(val, '***', 2, 6)}
    //             </a>
    //           </>
    //         }
    //       >
    //         {val} [点击复制]
    //       </EllipsisCustom>
    //     </>
    //   ),
    // },
    {
      title: fieldData.createTime.label,
      dataIndex: fieldData.createTime.name,
      width: 140,
      align: 'center',
      sorter: false,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.channel.label,
      dataIndex: fieldData.channel.name,
      width: 160,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {record.channelNote}
          </Ellipsis>
        </>
      ),
    },
    {
      title: formNameCollection.customOperate.label,
      dataIndex: formNameCollection.customOperate.name,
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
