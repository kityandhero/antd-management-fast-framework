import { connect } from 'umi';

import {
  columnFacadeMode,
  iconCollection,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common/es/utils/constants';
import MultiPage from 'antd-management-fast-framework/es/framework/DataMultiPageView/MultiPage';

import { accessWayCollection } from '@/customConfig/config';
import { getAccessWayStatusName } from '@/customSpecialComponents/FunctionSupplement/AccessWayStatus';

import { renderSearchWebChannelSelect } from '../../../customSpecialComponents/FunctionSupplement/WebChannel';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.accessWay.pageList.permission;

  columnOperateWidth = 126;

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

  apiDataConvert = (props) => {
    const {
      accessWay: { data },
    } = props;

    return data;
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

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;
    values[fieldData.channel.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
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
          component: renderSearchWebChannelSelect({
            global: this.getGlobal(),
          }),
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
      text: '刷新缓存',
      icon: iconCollection.reload,
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: record,
      confirm: {
        title: '将要刷新缓存，确定吗？',
      },
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 300,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.relativePath,
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
  ];
}

export default PageList;
