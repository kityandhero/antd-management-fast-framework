import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { buildTagList, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getDeviceTypeName,
  getUserDeviceStatusName,
  renderSearchDeviceTypeSelect,
} from '../../../customSpecialComponents';
import AddBasicInfoDrawer from '../Add';
import { refreshCacheAction, removeAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ userDevice, schedulingControl }) => ({
  userDevice,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.userDevice.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用户列表',
      paramsKey: accessWayCollection.userDevice.pageList.paramsKey,
      loadApiPath: 'userDevice/pageList',
      dateRangeFieldName: '创建时间',
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const userDeviceId = getValueByKey({
      data: handleData,
      key: fieldData.userDeviceId.name,
    });

    handleItem({
      target,
      value: userDeviceId,
      compareValueHandler: (o) => {
        const { userDeviceId: v } = o;

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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'changePermission': {
        this.showUpdateRoleModal(handleData);
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

      case 'remove': {
        this.remove(handleData);

        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = ({
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  buildAuthorityTagList = (authorityCollection) => {
    const list = [];

    authorityCollection.map((item) => {
      const { key, name } = item;

      list.push({
        key,
        text: name,
        color: '#87d068',
      });
    });

    return buildTagList({
      list,
    });
  };

  goToAdd = () => {
    this.goToPath(`/person/userDevice/add`);
  };

  goToEdit = (item) => {
    const userDeviceId = getValueByKey({
      data: item,
      key: fieldData.userDeviceId.name,
    });

    this.goToPath(`/person/userDevice/edit/load/${userDeviceId}/key/basicInfo`);
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.userDeviceId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.deviceCode,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchDeviceTypeSelect({}),
        },
        {
          lg: 5,
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
        text: '新增设备',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.userDevice.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          withDivider: true,
          uponDivider: true,
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除设备',
          confirm: true,
          title: '将要移除设备，确定吗？',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.avatar,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.loginName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.realName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.deviceType,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value + 21,
          }),
        };
      },
      formatValue: (value) => {
        return getDeviceTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.deviceCode,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getUserDeviceStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.userDeviceId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export default PageList;
