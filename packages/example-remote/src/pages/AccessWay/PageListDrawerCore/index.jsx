import {
  buildRandomHexColor,
  getValueByKey,
  isFunction,
  pretreatmentRequestParameters,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { getChannelName } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

class PageListDrawerCore extends MultiPageDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 1520,
      channel: unlimitedWithStringFlag.flag,
      loadApiPath: 'accessWay/pageList',
      dateRangeFieldName: '创建时间',
    };
  }

  refreshParentData = () => {
    const { afterOperateSuccess } = this.props;

    if (isFunction(afterOperateSuccess)) {
      afterOperateSuccess();
    }
  };

  supplementRequestSelectModuleParams = (o) => o;

  addMultiModuleWrapper = () => {
    let submitData = pretreatmentRequestParameters({}, (d) => {
      const { selectedDataTableDataRows } = this.state;
      const o = d;

      const guidTagList = [];

      for (const item of selectedDataTableDataRows || []) {
        guidTagList.push(
          getValueByKey({
            data: item,
            key: fieldData.guidTag.name,
          }),
        );
      }

      o.guidTagCollection = guidTagList.join(',');

      return o;
    });

    submitData = this.supplementRequestSelectModuleParams(submitData);

    this.addMultiModule(submitData);
  };

  addModule = () => {
    const text = 'addModule need be override';

    showSimpleErrorMessage(text);
  };

  addMultiModule = () => {
    const text = 'addMultiModule need be override';

    showSimpleErrorMessage(text);
  };

  addAllModule = () => {
    const text = 'addAllModule need be override';

    showSimpleErrorMessage(text);
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.relativePath,
        },
        {
          lg: 8,
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
        type: 'default',
        size: 'small',
        icon: iconBuilder.import(),
        text: '增加所选模块',
        handleClick: this.addMultiModuleWrapper,
        disabled: this.checkInProgress(),
        confirm: true,
        title: '将添加所选模块，确定吗？',
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        size: 'small',
        icon: iconBuilder.import(),
        text: '添加所有模块',
        handleClick: this.addAllModule,
        disabled: this.checkInProgress(),
        confirm: true,
        title: '将添加所有模块，确定吗？',
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '添加',
      icon: iconBuilder.import(),
      handleButtonClick: ({ handleData }) => {
        let submitData = pretreatmentRequestParameters({}, (d) => {
          const o = d;

          o.guidTag = getValueByKey({
            data: handleData,
            key: fieldData.guidTag.name,
          });

          return o;
        });

        submitData = this.supplementRequestSelectModuleParams(submitData);

        this.addModule(submitData);
      },
      handleData: record,
      confirm: true,
      title: '将添加此操作模块，确定吗？',
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
      dataTarget: fieldData.relativePath,
      align: 'left',
      width: 300,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.expand,
      width: 240,
      showRichFacade: true,
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
    {
      dataTarget: fieldData.guidTag,
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
}

export { PageListDrawerCore };
