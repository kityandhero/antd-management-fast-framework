import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toString,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getCallCenterCategoryStatusName,
  renderSearchCallCenterStatusSelect,
} from '../../../customSpecialComponents';
import { singleTreeListAction as categorySingleTreeListAction } from '../../CallCenterCategory/Assist/action';
import {
  refreshCacheAction,
  removeAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ callCenter, schedulingControl }) => ({
  callCenter,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.callCenter.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '列表',
      paramsKey: accessWayCollection.callCenter.pageList.paramsKey,
      loadApiPath: 'callCenter/pageList',
      categoryTreeData: [],
      categoryId: '',
      categoryName: '',
      currentRecord: null,
    };
  }

  doOtherRemoteRequest = () => {
    this.loadCategoryTreeList({ refresh: whetherNumber.no });
  };

  loadCategoryTreeList = ({ refresh = whetherNumber.no }) => {
    categorySingleTreeListAction({
      target: this,
      handleData: { refresh },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          categoryTreeData: remoteListData,
        });
      },
    });
  };

  reloadCategoryTreeList = () => {
    this.loadCategoryTreeList({ refresh: whetherNumber.yes });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { categoryId } = this.state;

    d[fieldData.categoryId.name] = categoryId;

    return d;
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const callCenterId = getValueByKey({
      data: handleData,
      key: fieldData.callCenterId.name,
    });

    handleItem({
      target,
      value: callCenterId,
      compareValueHandler: (o) => {
        const { callCenterId: v } = o;

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
      case 'updateSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'setOnline': {
        this.setOnline(handleData);
        break;
      }

      case 'setOffline': {
        this.setOffline(handleData);
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
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  remove = (record) => {
    removeAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  handleSearchResetState = () => {
    return {
      categoryId: '',
    };
  };

  showChangeSortModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeSortModal.open();
    });
  };

  afterChangeSortModalOk = ({
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

  goToAdd = () => {
    this.goToPath(`/assistTools/callCenter/add`);
  };

  goToEdit = (record) => {
    const callCenterId = getValueByKey({
      data: record,
      key: fieldData.callCenterId.name,
    });

    this.goToPath(
      `/assistTools/callCenter/edit/load/${callCenterId}/key/basicInfo`,
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    const { categoryId, categoryTreeData } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.treeSelect,
          fieldData: fieldData.categoryId,
          value: categoryId,
          require: true,
          listData: categoryTreeData,
          addonAfter: buildButton({
            text: '',
            title: '刷新选择列表',
            icon: iconBuilder.reload(),
            handleClick: () => {
              this.reloadCategoryTreeList();
            },
          }),
          dataConvert: (o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          },
          // eslint-disable-next-line no-unused-vars
          onChange: ({ value, label, extra }) => {
            this.setState({
              categoryId: toString(value),
            });
          },
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchCallCenterStatusSelect({}),
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
        text: '新增',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setOnline',
          icon: iconBuilder.upload(),
          text: '设为上线',
          disabled: status === statusCollection.online,
          confirm: true,
          title: '将要设为上线，确定吗？',
        },
        {
          key: 'setOffline',
          icon: iconBuilder.download(),
          text: '设为下线',
          disabled: status === statusCollection.offline,
          confirm: true,
          title: '将要设为下线，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      align: 'left',
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.contactInformation,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.categoryName,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.description,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
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
          text: getCallCenterCategoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.callCenterId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '简要说明',
      list: [
        {
          text: '数据排序顺序为，优先按照排序值降序排列, 然后按照创建时间降序排序.',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />
      </>
    );
  };
}

export default PageList;
