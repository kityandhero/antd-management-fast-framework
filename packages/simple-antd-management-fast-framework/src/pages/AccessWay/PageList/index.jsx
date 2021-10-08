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

import { toNumber, showInfoMessage, getValueByKey } from '@fast-framework/utils/tools';
import {
  columnFacadeMode,
  searchFormContentConfig,
  columnPlaceholder,
  unlimitedWithStringFlag,
  convertCollection,
} from '@fast-framework/utils/constants';
import { handleItem } from '@fast-framework/utils/actionAssist';
import MultiPage from '@fast-framework/framework/DataMultiPageView/MultiPage';
import { buildDropdownButton } from '@fast-framework/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';
import {
  getAccessWayStatusName,
  renderSearchAccessWayStatusSelect,
} from '@/customSpecialComponents/FunctionSupplement/AccessWayStatus';

import {
  setOfflineConfirmAction,
  setOnlineConfirmAction,
  refreshCacheConfirmAction,
} from '../Assist/action';
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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setOnline':
        this.setOnline(handleData);
        break;

      case 'setOffline':
        this.setOffline(handleData);
        break;

      case 'refreshCache':
        refreshCacheConfirmAction({ target: this, handleData });
        break;

      default:
        break;
    }
  };

  handleItemStatus = ({ target, record, remoteData }) => {
    const accessWayId = getValueByKey({
      data: metaData,
      key: fieldData.accessWayId.name,
    });

    handleItem({
      target,
      dataId: accessWayId,
      compareDataIdHandler: (o) => {
        const { accessWayId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  setOffline = (r) => {
    setOfflineConfirmAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOnline = (r) => {
    setOnlineConfirmAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
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

  renderSimpleFormInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;
    values[fieldData.channel.name] = unlimitedWithStringFlag.key;

    return values;
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
          component: renderSearchAccessWayStatusSelect({
            global: this.getGlobal(),
          }),
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
              key: 'setOnline',
              icon: <PlayCircleOutlined />,
              text: '设为上线',
              disabled: itemStatus === statusCollection.online,
            },
            {
              key: 'setOffline',
              icon: <PauseCircleOutlined />,
              text: '设为下线',
              disabled: itemStatus === statusCollection.offline,
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
