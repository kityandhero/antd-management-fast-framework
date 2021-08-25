import React from 'react';
import { connect } from 'umi';
import { Dropdown, Menu } from 'antd';
import { ReloadOutlined, ReadOutlined, PlusOutlined } from '@ant-design/icons';

import { toNumber, showInfoMessage } from 'antd-management-fast-framework/lib/utils/tools';
import {
  columnFacadeMode,
  searchFormContentConfig,
  columnPlaceholder,
} from 'antd-management-fast-framework/lib/utils/constants';
import { handleItem } from 'antd-management-fast-framework/lib/utils/actionAssist';
import MultiPage from 'antd-management-fast-framework/lib/framework/DataMultiPageView/MultiPage';
import { buildDropdown } from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

import { pageConfig } from '@/customConfig/config';

import {
  setOfflineConfirmAction,
  setOnlineConfirmAction,
  refreshCacheConfirmAction,
} from '../Assist/action';
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
        paramsKey: pageConfig.accessWay.pageList.paramsKey,
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

  handleMenuClick = ({ key, record }) => {
    switch (key) {
      case 'setOnline':
        this.setOnline(record);
        break;

      case 'setOffline':
        this.setOffline(record);
        break;

      default:
        break;
    }
  };

  handleItemStatus = ({ target, record, remoteData }) => {
    const accessWayId = getPathValue(record, fieldData.accessWayId.name);

    handleItem({
      target,
      dataId: accessWayId,
      compareDataIdHandler: (o) => {
        const { accessWayId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getPathValue(remoteData, fieldData.status.name);

        return d;
      },
    });
  };

  setOffline = (r) => {
    setOfflineConfirmAction({
      target: this,
      record: r,
      successCallback: ({ target, record, remoteData }) => {
        target.handleItemStatus({ target, record, remoteData });
      },
    });
  };

  setOnline = (r) => {
    setOnlineConfirmAction({
      target: this,
      record: r,
      successCallback: ({ target, record, remoteData }) => {
        target.handleItemStatus({ target, record, remoteData });
      },
    });
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
          component: renderSearchWebChannelSelect({
            global: this.getGlobal(),
          }),
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
      width: 670,
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
    columnPlaceholder,
    {
      dataTarget: fieldData.customOperate,
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, r) => {
        const itemStatus = toNumber(getPathValue(r, fieldData.status.name));

        return buildDropdown({
          size: 'small',
          text: '修改',
          icon: <EditOutlined />,
          handleButtonClick: ({ record }) => {
            this.goToEdit(record);
          },
          record: r,
          handleMenuClick: ({ key, record }) => {
            this.handleMenuClick({ key, record });
          },
          menuItems: [
            {
              key: 'setOnline',
              icon: <PlayCircleOutlined />,
              text: '设为上线',
              disabled: itemStatus === statusCollection.start,
            },
            {
              key: 'setOffline',
              icon: <PauseCircleOutlined />,
              text: '设为下线',
              disabled: itemStatus === statusCollection.stop,
            },
            {
              key: 'refreshCache',
              withDivider: true,
              uponDivider: true,
              icon: <ReloadOutlined />,
              text: '刷新缓存',
            },
          ],
        });
      },
    },
  ];
}

export default PageList;
