import {
  buildRandomHexColor,
  checkHasAuthority,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getChannelName } from '../../../customSpecialComponents';
import { removeAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

const visibleFlag = '9cf0fbb9ca2349efbaedcf56c1f43281';

class PageListAssemblyVerifyDrawer extends MultiPageDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '检测有误的权限数据',
      tableScrollX: 1520,
      loadApiPath: 'accessWay/pageListAssemblyVerify',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
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

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '移除',
      icon: iconBuilder.delete(),
      disabled: !checkHasAuthority(
        accessWayCollection.accessWay.remove.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.remove(handleData);
      },
      handleData: record,
      confirm: true,
      title: '即将移除数据，确定吗？',
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

export { PageListAssemblyVerifyDrawer };
