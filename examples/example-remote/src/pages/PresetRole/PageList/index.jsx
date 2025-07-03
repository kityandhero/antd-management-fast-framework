import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  getPresetRoleStatusName,
  renderSearchManagementChannelSelect,
} from '../../../customSpecialComponents';
import AddModal from '../AddModal';
import {
  refreshCacheAction,
  removeAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, statusCollection } from '../Common/data';
import { ModuleTreeDrawer } from '../ModuleTreeDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.presetRole.pageList.paramsKey,
      pageTitle: '预设角色列表',
      loadApiPath: 'presetRole/pageList',
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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showModuleTree': {
        this.showModuleTreeDrawer(handleData);

        break;
      }

      case 'setEnable': {
        this.setEnable(handleData);

        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);

        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      case 'remove': {
        this.remove(handleData);

        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const presetRoleId = getValueByKey({
      data: handleData,
      key: fieldData.presetRoleId.name,
    });

    handleItem({
      target,
      value: presetRoleId,
      compareValueHandler: (o) => {
        const { presetRoleId: v } = o;

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

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  showModuleTreeDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        ModuleTreeDrawer.open();
      },
    );
  };

  showAddModal = () => {
    AddModal.open();
  };

  afterAddModalOk = () => {
    this.reloadData({ delay: 500 });
  };

  goToEdit = (record) => {
    const presetRoleId = getValueByKey({
      data: record,
      key: fieldData.presetRoleId.name,
    });

    this.goToPath(
      `/permission/presetRole/edit/load/${presetRoleId}/key/basicInfo`,
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.channel.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchManagementChannelSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增预设角色',
        handleClick: this.showAddModal,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const itemStatus = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const itemIsSuper = getValueByKey({
      data: record,
      key: fieldData.isSuper.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showModuleTree',
          icon: iconBuilder.read(),
          text: '查看模块',
          hidden: !!itemIsSuper,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setEnable',
          icon: iconBuilder.upCircle(),
          text: '设为上线',
          hidden: !!itemIsSuper,
          disabled: itemStatus === statusCollection.enable,
          confirm: true,
          title: '将要设置为上线，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.downCircle(),
          text: '设为下线',
          hidden: !!itemIsSuper,
          disabled: itemStatus === statusCollection.disable,
          confirm: true,
          title: '将要设置为下线，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除角色',
          hidden: !checkHasAuthority(
            accessWayCollection.presetRole.remove.permission,
          ),
          confirm: true,
          title: '将要移除角色，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 200,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.description,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.moduleCount,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return value === '' ? '0' : value;
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getPresetRoleStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 150,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 31,
          }),
        };
      },
      formatValue: (value) => {
        return getChannelName({
          value: value,
        });
      },
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <AddModal afterOK={this.afterAddModalOk} />

        <ModuleTreeDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
