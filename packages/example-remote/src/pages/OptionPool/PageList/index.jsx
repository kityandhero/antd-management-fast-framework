import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getBusinessModeName,
  getOptionPoolCategoryName,
  getOptionPoolStatusName,
} from '../../../customSpecialComponents';
import { AddBasicInfoDrawer } from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, statusCollection } from '../Common/data';
import { UpdateBasicInfoDrawer } from '../UpdateBasicInfoDrawer';
import { UpdateSortModal } from '../UpdateSortModal';

const { MultiPage } = DataMultiPageView;

@connect(({ optionPool, schedulingControl }) => ({
  optionPool,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.optionPool.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '选项集合列表',
      paramsKey: accessWayCollection.optionPool.pageList.paramsKey,
      loadApiPath: 'optionPool/pageList',
      dateRangeFieldName: '开通时间',
      tableScrollX: 1520,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

      case 'updateSort': {
        this.showUpdateSortModal(handleData);
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

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const optionPoolId = getValueByKey({
      data: handleData,
      key: fieldData.optionPoolId.name,
    });

    handleItem({
      target,
      value: optionPoolId,
      compareValueHandler: (o) => {
        const { optionPoolId: v } = o;

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

  setEnable = (record) => {
    setEnableAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (record) => {
    setDisableAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateBasicInfoDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        UpdateBasicInfoDrawer.open();
      },
    );
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateSortModal = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        UpdateSortModal.open();
      },
    );
  };

  afterUpdateSortModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToAdd = () => {
    this.goToPath(`/optionPool/add`);
  };

  goToEdit = (record) => {
    const optionPoolId = getValueByKey({
      data: record,
      key: fieldData.optionPoolId.name,
    });

    this.goToPath(`/optionPool/edit/load/${optionPoolId}/key/basicInfo`);
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.addCircle(),
        text: '新增选项',
        hidden: !checkHasAuthority(
          accessWayCollection.optionPool.addBasicInfo.permission,
        ),
        handleClick: () => {
          this.showAddBasicInfoDrawer();
        },
      },
    ];
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.optionPool.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showUpdateBasicInfoDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setEnable',
          icon: iconBuilder.upload(),
          text: '设为启用',
          hidden: !checkHasAuthority(
            accessWayCollection.optionPool.setEnable.permission,
          ),
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '即将设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.download(),
          text: '设为禁用',
          hidden: !checkHasAuthority(
            accessWayCollection.optionPool.setDisable.permission,
          ),
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '即将设为禁用，确定吗？',
        },
        {
          key: 'updateSort',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.edit(),
          text: '设置排序',
          hidden: !checkHasAuthority(
            accessWayCollection.optionPool.updateSort.permission,
          ),
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.optionPool.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 320,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.businessMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 9,
          }),
        };
      },
      formatValue: (value) => {
        return getBusinessModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.category,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return getOptionPoolCategoryName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getOptionPoolStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.description,
      width: 360,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.optionPoolId,
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

  establishHelpConfig = () => {
    return {
      title: '说明提示',
      list: [
        {
          text: '社区团购选项仅适用于社区团购业务',
        },
        {
          text: '一件代发选项仅适用于通过快递等发货渠道的商城',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { optionPoolId, currentRecord } = this.state;

    return (
      <>
        <AddBasicInfoDrawer
          externalData={{ optionPoolId }}
          afterOK={() => {
            this.afterAddBasicInfoDrawerOk();
          }}
        />

        <UpdateBasicInfoDrawer
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateBasicInfoDrawerOk();
          }}
        />

        <UpdateSortModal
          externalData={currentRecord}
          afterOK={this.afterUpdateSortModalOk}
          afterCancel={this.afterUpdateSortModalCancel}
        />
      </>
    );
  };
}

export default PageList;
