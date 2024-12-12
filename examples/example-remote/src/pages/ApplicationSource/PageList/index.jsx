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
  getApplicationSourceCreateModeName,
  getApplicationSourceStatusName,
  getApplicationSourceTypeName,
  renderSearchApplicationSourceStatusSelect,
  renderSearchApplicationSourceTypeSelect,
} from '../../../customSpecialComponents';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ applicationSource, schedulingControl }) => ({
  applicationSource,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.applicationSource.pageList.paramsKey,
      pageTitle: '应用源列表',
      loadApiPath: 'applicationSource/pageList',
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

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const applicationSourceId = getValueByKey({
      data: handleData,
      key: fieldData.applicationSourceId.name,
    });

    handleItem({
      target,
      value: applicationSourceId,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.applicationSourceId.name,
        });

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

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
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

  goToEdit = (record) => {
    const applicationSourceId = getValueByKey({
      data: record,
      key: fieldData.applicationSourceId.name,
    });

    this.goToPath(
      `/app/applicationSource/edit/load/${applicationSourceId}/key/basicInfo`,
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.type.name] = unlimitedWithStringFlag.key;
    values[fieldData.status.name] = unlimitedWithStringFlag.key;

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
          component: renderSearchApplicationSourceTypeSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchApplicationSourceStatusSelect({}),
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
        icon: iconBuilder.pauseCircle(),
        text: '新增应用源',
        handleClick: this.showAddBasicInfoDrawer,
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
        accessWayCollection.applicationSource.get.permission,
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
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '即将设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '即将设为禁用，确定吗？',
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
      width: 540,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return value === 0 ? '' : value;
      },
    },
    {
      dataTarget: fieldData.logo,
      width: 80,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.shortName,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return value === 0 ? '' : value;
      },
    },
    {
      dataTarget: fieldData.type,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 10,
          }),
        };
      },
      formatValue: (value) => {
        return getApplicationSourceTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.createMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 30,
          }),
        };
      },
      formatValue: (value) => {
        return getApplicationSourceCreateModeName({
          value: value,
        });
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
          text: getApplicationSourceStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.applicationSourceId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  renderPresetOther = () => {
    return (
      <>
        <AddBasicInfoDrawer afterOK={this.afterAddBasicInfoDrawerOk} />
      </>
    );
  };
}

export default PageList;
