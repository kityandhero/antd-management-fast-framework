import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  buildListViewItemInnerWithDropdownButton,
  ColorText,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getSubsidiaryStatusName,
  getTagStatusName,
} from '../../../customSpecialComponents';
import { GraphicalSingleSubsidiaryDepartmentTreeDrawer } from '../../Organization/GraphicalSingleSubsidiaryDepartmentTreeDrawer';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '公司列表',
      paramsKey: accessWayCollection.subsidiary.pageList.paramsKey,
      listViewMode: listViewConfig.viewMode.list,
      loadApiPath: 'subsidiary/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const subsidiaryId = getValueByKey({
      data: handleData,
      key: fieldData.subsidiaryId.name,
    });

    handleItem({
      target,
      value: subsidiaryId,
      compareValueHandler: (o) => {
        const { subsidiaryId: v } = o;

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
      case 'showGraphical': {
        this.openGraphicalSingleSubsidiaryDepartmentTreeDrawer(handleData);
        break;
      }

      case 'updateSort': {
        this.showChangeSortModal(handleData);
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

      default: {
        showSimpleErrorMessage('can not find matched key');
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

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  openGraphicalSingleSubsidiaryDepartmentTreeDrawer = (item) => {
    this.setState({ currentRecord: item }, () => {
      GraphicalSingleSubsidiaryDepartmentTreeDrawer.open();
    });
  };

  showChangeSortModal = (item) => {
    this.setState({ currentRecord: item }, () => {
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
    this.goToPath(`/organization/subsidiary/add`);
  };

  goToEdit = (record) => {
    const { subsidiaryId } = record;

    this.goToPath(
      `/organization/subsidiary/edit/load/${subsidiaryId}/key/basicInfo`,
    );
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.subsidiaryId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.shortName,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.fullName,
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
        text: '增加公司',
        handleClick: this.goToAdd,
      },
    ];
  };

  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldData.logo.name,
        defaultValue: defaultEmptyImage,
      }),
    });
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return buildListViewItemInnerWithDropdownButton({
      title: {
        label: fieldData.shortName.label,
        text: getValueByKey({
          data: item,
          key: fieldData.shortName.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.fullName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.fullName.name,
          }),
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={fieldData.status.label}
              text={getSubsidiaryStatusName({
                value: status,
              })}
              randomColor
              randomSeed={status}
              separatorStyle={{
                paddingRight: '4px',
              }}
              seedOffset={18}
            />
          ),
        },
      ],
      actionList: [
        {
          label: fieldData.subsidiaryId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.subsidiaryId.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.code.label,
          text: getValueByKey({
            data: item,
            key: fieldData.code.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
        {
          label: fieldData.parentShortName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.parentShortName.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
        {
          label: fieldData.sort.label,
          text: getValueByKey({
            data: item,
            key: fieldData.sort.name,
          }),
          color: '#999999',
        },
        {
          label: fieldData.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldData.createTime.name,
          }),
          color: '#999999',
        },
      ],
      extra: {
        size: 'small',
        text: '编辑',
        placement: 'topRight',
        icon: iconBuilder.edit(),
        disabled: !checkHasAuthority(
          accessWayCollection.subsidiary.get.permission,
        ),
        handleButtonClick: ({ handleData }) => {
          this.goToEdit(handleData);
        },
        handleData: item,
        handleMenuClick: ({ key, handleData }) => {
          this.handleMenuClick({ key, handleData });
        },
        items: [
          {
            key: 'showGraphical',
            icon: iconBuilder.read(),
            text: '查看组织图例',
          },
          {
            withDivider: true,
            uponDivider: true,
            key: 'updateSort',
            icon: iconBuilder.edit(),
            text: '设置排序值',
          },
          {
            withDivider: true,
            uponDivider: true,
            key: 'setEnable',
            icon: iconBuilder.playCircle(),
            text: '设为启用',
            disabled: status === statusCollection.enable,
            confirm: true,
            title: '将要设为启用，确定吗？',
          },
          {
            key: 'setDisable',
            icon: iconBuilder.pauseCircle(),
            text: '设为禁用',
            disabled: status === statusCollection.disable,
            confirm: true,
            title: '将要设为禁用，确定吗？',
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
      },
    });
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.logo,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.fullName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.shortName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.code,
      width: 100,
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
          text: getTagStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.parentShortName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
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

        <GraphicalSingleSubsidiaryDepartmentTreeDrawer
          maskClosable
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
