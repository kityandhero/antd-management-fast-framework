import React from 'react';
import { connect } from 'umi';
import { Dropdown, Menu } from 'antd';
import {
  ReloadOutlined,
  ReadOutlined,
  PlusOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';

import {
  toNumber,
  showInfoMessage,
  getValueByKey,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  columnFacadeMode,
  searchCardConfig,
  columnPlaceholder,
  unlimitedWithStringFlag,
  convertCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import { handleItem } from 'antd-management-fast-framework/es/utils/actionAssist';
import MultiPage from 'antd-management-fast-framework/es/framework/DataMultiPageView/MultiPage';
import { buildDropdownButton } from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';
import {
  getAccessWayStatusName,
  renderSearchAccessWayStatusSelect,
} from '@/customSpecialComponents/FunctionSupplement/AccessWayStatus';

import { refreshCacheAction } from '../Assist/action';
import { renderSearchWebChannelSelect } from '../../../customSpecialComponents/FunctionSupplement/WebChannel';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.accessWay.pageList.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '模块列表',
        paramsKey: accessWayCollection.accessWay.pageList.paramsKey,
        loadApiPath: 'accessWay/pageList',
        dateRangeFieldName: '生成时段',
      },
    };
  }

  getGlobal = () => {
    const { global } = this.props;

    return global || null;
  };

  getApiData = (props) => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache':
        this.refreshCache(handleData);
        break;

      default:
        break;
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  getStatusBadge = (v) => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'processing';
        break;

      case 0:
        result = 'default';
        break;

      default:
        result = 'error';
        break;
    }

    return result;
  };

  goToEdit = (record) => {
    const { accessWayId } = record;

    this.goToPath(`/permission/accessWay/edit/load/${accessWayId}/key/basicInfo`);
  };

  buildExtraButtonList = () => {
    return [
      {
        type: 'primary',
        icon: <PlusOutlined />,
        text: '确认按钮',
        onClick: () => {
          showInfoMessage({
            message: 'click confirm button',
          });
        },
        confirm: {
          placement: 'topRight',
          title: '将要进行操作，确定吗？',
          okText: '确定',
          cancelText: '取消',
        },
      },
      {
        type: 'primary',
        icon: <PlusOutlined />,
        text: '普通按钮',
        onClick: () => {
          showInfoMessage({
            message: 'click button',
          });
        },
      },
    ];
  };

  renderSimpleFormInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;
    values[fieldData.channel.name] = unlimitedWithStringFlag.key;

    return values;
  };

  searchCardConfigData = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchAccessWayStatusSelect({
            global: this.getGlobal(),
          }),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchWebChannelSelect({
            global: this.getGlobal(),
          }),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.renderSimpleFormButtonCore(),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 520,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.relativePath,
      width: 300,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.guidTag,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (val) => {
        return {
          status: this.getStatusBadge(val),
          text: getAccessWayStatusName({
            global: this.getGlobal(),
            value: val,
          }),
        };
      },
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
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    columnPlaceholder,
    {
      dataTarget: fieldData.customOperate,
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, r) => {
        const itemStatus = getValueByKey({
          data: r,
          key: fieldData.status.name,
          convert: convertCollection.number,
        });

        return buildDropdownButton({
          size: 'small',
          text: '修改',
          icon: <EditOutlined />,
          handleButtonClick: ({ handleData }) => {
            this.goToEdit(handleData);
          },
          handleData: r,
          handleMenuClick: ({ key, handleData }) => {
            this.handleMenuClick({ key, handleData });
          },
          menuItems: [
            {
              key: 'refreshCache',
              icon: <ReloadOutlined />,
              text: '刷新缓存',
              confirm: {
                title: '将要刷新缓存，确定吗？',
              },
            },
          ],
        });
      },
    },
  ];
}

export default PageList;
