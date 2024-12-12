import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  extraBuildType,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getAdministrativeDivisionLevelName,
  getAdministrativeDivisionStatusName,
  renderSearchAdministrativeDivisionLevelSelect,
} from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { TreeCrossingLevelDrawer } from '../TreeCrossingLevelDrawer';
import { TreeDefaultCityDrawer } from '../TreeDefaultCityDrawer';
import { TreeDefaultProvinceDrawer } from '../TreeDefaultProvinceDrawer';
import { UpdateBasicInfoDrawer } from '../UpdateBasicInfoDrawer';
import { UpdateLocationInfoModal } from '../UpdateLocationInfoModal';

const { MultiPage } = DataMultiPageView;

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.administrativeDivision.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '行政区划列表',
      paramsKey: accessWayCollection.administrativeDivision.pageList.paramsKey,
      loadApiPath: 'administrativeDivision/pageList',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'updateLocationInfo': {
        this.showUpdateLocationInfoModal(handleData);
        break;
      }

      case 'showTreeCrossingLevelDrawer': {
        this.showTreeCrossingLevelDrawer(handleData);
        break;
      }

      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
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

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  showUpdateLocationInfoModal = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        UpdateLocationInfoModal.open();
      },
    );
  };

  afterUpdateLocationInfoModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateBasicInfoDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        UpdateBasicInfoDrawer.open();
      },
    );
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({ delay: 500 });
  };

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  showTreeDefaultProvinceDrawer = () => {
    TreeDefaultProvinceDrawer.open();
  };

  showTreeDefaultCityDrawer = () => {
    TreeDefaultCityDrawer.open();
  };

  showTreeCrossingLevelDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        TreeCrossingLevelDrawer.open();
      },
    );
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.read(),
          text: '默认省节点树型图',
          size: 'small',
          handleClick: () => {
            this.showTreeDefaultProvinceDrawer();
          },
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.read(),
          text: '默认市节点树型图',
          size: 'small',
          handleClick: () => {
            this.showTreeDefaultCityDrawer();
          },
        },
      ],
    };
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.level.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.inputNumber,
          fieldData: fieldData.code,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.inputNumber,
          fieldData: fieldData.parentCode,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchAdministrativeDivisionLevelSelect({}),
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.administrativeDivision.get.permission,
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
          key: 'updateLocationInfo',
          icon: iconBuilder.edit(),
          text: '设置位置',
          hidden: !checkHasAuthority(
            accessWayCollection.administrativeDivision.updateLocationInfo
              .permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showTreeCrossingLevelDrawer',
          icon: iconBuilder.nodeIndex(),
          text: '级联树信息',
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
          hidden: !checkHasAuthority(
            accessWayCollection.administrativeDivision.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 320,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.shortName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.code,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.level,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 2 + 18,
          }),
        };
      },
      formatValue: (value) => {
        return getAdministrativeDivisionLevelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.longitude,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.latitude,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.parentName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.parentCode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 140,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getAdministrativeDivisionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.administrativeDivisionId,
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
        <UpdateBasicInfoDrawer
          externalData={currentRecord}
          afterOK={this.afterUpdateBasicInfoDrawerOk}
        />

        <UpdateLocationInfoModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateLocationInfoModalOk();
          }}
        />

        <OperateLogDrawer externalData={currentRecord} />

        <TreeDefaultProvinceDrawer maskClosable />

        <TreeDefaultCityDrawer maskClosable />

        <TreeCrossingLevelDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
