import React from 'react';

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
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getDepartmentOwnershipModeName,
  getDepartmentStatusName,
  renderSearchDepartmentOwnershipModeSelect,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setInvalidAction,
  setNormalAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ department, schedulingControl }) => ({
  department,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.department.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '部门列表',
      paramsKey: accessWayCollection.department.pageList.paramsKey,
      loadApiPath: 'department/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const departmentId = getValueByKey({
      data: handleData,
      key: fieldData.departmentId.name,
    });

    handleItem({
      target,
      value: departmentId,
      compareValueHandler: (o) => {
        const { departmentId: v } = o;

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

      case 'setNormal': {
        this.setNormal(handleData);
        break;
      }

      case 'setInvalid': {
        this.setInvalid(handleData);
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

  setNormal = (r) => {
    setNormalAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setInvalid = (r) => {
    setInvalidAction({
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

  goToAdd = () => {
    this.goToPath(`/organization/department/add`);
  };

  goToEdit = (record) => {
    const { departmentId } = record;

    this.goToPath(
      `/organization/department/edit/load/${departmentId}/key/basicInfo`,
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.ownershipMode.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.departmentId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchDepartmentOwnershipModeSelect({}),
        },
        {
          lg: 4,
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
        text: '增加部门',
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
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.department.get.permission,
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
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setNormal',
          icon: iconBuilder.playCircle(),
          text: '设为正常',
          disabled: status === statusCollection.normal,
          confirm: true,
          title: '将要设为启用，确定吗？',
        },
        {
          key: 'setInvalid',
          icon: iconBuilder.pauseCircle(),
          text: '设为无效',
          disabled: status === statusCollection.invalid,
          confirm: true,
          title: '将要设为禁用，确定吗？',
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
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.ownershipMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 29,
          }),
        };
      },
      formatValue: (value) => {
        return getDepartmentOwnershipModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.parentName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 180,
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
          text: getDepartmentStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.parentId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.departmentId,
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
        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />
      </>
    );
  };
}

export default PageList;
