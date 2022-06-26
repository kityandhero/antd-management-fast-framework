import { connect } from 'umi';

import MultiPage from 'antd-management-fast-framework/es/framework/DataMultiPageView/MultiPage';
import {
  columnFacadeMode,
  columnPlaceholder,
  iconCollection,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-framework/es/utils/constants';
import { showInfoMessage } from 'antd-management-fast-framework/es/utils/tools';

import { accessWayCollection } from '@/customConfig/config';
import {
  getAccessWayStatusName,
  renderSearchAccessWayStatusSelect,
} from '@/customSpecialComponents/FunctionSupplement/AccessWayStatus';

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

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.button,
        type: 'primary',
        icon: iconCollection.plus,
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
        icon: iconCollection.plus,
        text: '普通按钮',
        onClick: () => {
          showInfoMessage({
            message: 'click button',
          });
        },
      },
    ];
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
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '修改',
      icon: iconCollection.edit,
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          icon: iconCollection.reload,
          text: '刷新缓存',
          confirm: {
            title: '将要刷新缓存，确定吗？',
          },
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
  ];
}

export default PageList;
