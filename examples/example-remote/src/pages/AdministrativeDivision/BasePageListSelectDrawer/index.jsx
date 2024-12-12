import { isArray, toNumber } from 'easy-soft-utility';

import {
  buildRandomHexColor,
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { getAdministrativeDivisionLevelName } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

// 组件基类, 仅为代码复用性设计, 具体使用时请自行考虑
class BasePageListSelectDrawer extends MultiPageSelectDrawer {
  // 显示时是否自动刷新数据;
  reloadWhenShow = true;

  confirmSelect = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showSelect: true,
      pageTitle: '地区列表',
      // 页面加载时自动加载的远程请求
      loadApiPath: '',
      // 设置默认试图模式为 table
      listViewMode: listViewConfig.viewMode.table,
      // table 显示模式行长度, 合理设置可以提升美观以及用户体验，超出可见区域将显示滚动条
      tableScrollX: 620,
    };
  }

  renderPresetTitleIcon = () => {
    return null;
  };

  // 配置搜索框
  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  // 构建通知文本, 仅多选模式有效, 单选时不会触发通知
  buildSelectNotificationDescription = (o) => {
    if (isArray(o)) {
      let list = [];

      for (const item of o) {
        const { title } = item;
        list.push(title);
      }

      if (list.length > 0) {
        return `已选择: ${list.join(',')}`;
      }

      return '';
    } else {
      const { title } = o;

      return `已选择: ${title}`;
    }
  };

  // 配置 table 显示模式数据列
  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.shortName,
      width: 140,
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
      dataTarget: fieldData.administrativeDivisionId,
      width: 140,
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
}

export { BasePageListSelectDrawer };
