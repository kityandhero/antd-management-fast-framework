import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { buildTagList, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getMasterManagerStatusName } from '../../../customSpecialComponents';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  removeAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { UpdateRoleModal } from '../ChangeRoleModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ masterManager, schedulingControl }) => ({
  masterManager,
  schedulingControl,
}))
class PageList extends MultiPage {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  componentAuthority = accessWayCollection.masterManager.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用户列表',
      paramsKey: accessWayCollection.masterManager.pageList.paramsKey,
      loadApiPath: 'masterManager/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const masterManagerId = getValueByKey({
      data: handleData,
      key: fieldData.masterManagerId.name,
    });

    handleItem({
      target,
      value: masterManagerId,
      compareValueHandler: (o) => {
        const { masterManagerId: v } = o;

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

  handleItemAuthority = ({ target, handleData, remoteData }) => {
    const masterManagerId = getValueByKey({
      data: handleData,
      key: fieldData.masterManagerId.name,
    });

    handleItem({
      target,
      value: masterManagerId,
      compareValueHandler: (o) => {
        const { masterManagerId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.authorityCollection.name] = [
          ...getValueByKey({
            data: remoteData,
            key: fieldData.authorityCollection.name,
            convert: convertCollection.array,
          }),
        ];

        o[fieldData.authorityKeyCollection.name] = [
          ...getValueByKey({
            data: remoteData,
            key: fieldData.authorityKeyCollection.name,
            convert: convertCollection.array,
          }),
        ];

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

  showUpdateRoleModal = (r) => {
    this.setState(
      {
        currentRecord: { ...r },
      },
      () => {
        UpdateRoleModal.open();
      },
    );
  };

  afterUpdateRoleModalOk = ({
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

  goToEdit = (record) => {
    const { masterManagerId } = record;

    this.goToPath(
      `/account/masterManager/edit/load/${masterManagerId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.masterManagerId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.loginName,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
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
        text: '新增账户',
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
    });

    const canOperate = getValueByKey({
      data: item,
      key: fieldData.canOperate.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled:
        !checkHasAuthority(accessWayCollection.masterManager.get.permission) ||
        canOperate === whetherNumber.no,
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'changePermission',
          icon: iconBuilder.edit(),
          text: '变更权限',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          disabled:
            status === statusCollection.enable ||
            canOperate === whetherNumber.no,
          confirm: true,
          title: '将要设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          disabled:
            status === statusCollection.disable ||
            canOperate === whetherNumber.no,
          confirm: true,
          title: '将要设为禁用，确定吗？',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'remove',
          icon: iconBuilder.delete(),
          disabled: canOperate === whetherNumber.no,
          text: '移除账户',
          confirm: true,
          title: '将要移除账户，确定吗？',
        },
        {
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
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.name,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.email,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.authorityCollection,
      align: 'left',
      render: (value) => {
        return (
          <>
            {(value || []).length === 0 ? '--' : null}

            {(value || []).length > 0 ? (
              <>{this.buildAuthorityTagList(value)}</>
            ) : null}
          </>
        );
      },
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
          text: getMasterManagerStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.masterManagerId,
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

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <AddBasicInfoDrawer afterOK={this.afterAddBasicInfoDrawerOk} />

        <UpdateRoleModal
          externalData={currentRecord}
          afterOK={this.afterUpdateRoleModalOk}
        />
      </>
    );
  };
}

export default PageList;
