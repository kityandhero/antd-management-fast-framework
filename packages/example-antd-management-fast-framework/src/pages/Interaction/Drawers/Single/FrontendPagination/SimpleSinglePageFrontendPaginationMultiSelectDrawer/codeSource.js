export const code = `import { connect } from 'easy-soft-dva';
import { isArray } from 'easy-soft-utility';

import {
  columnFacadeMode,
  columnPlaceholder,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  DataSinglePageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { colorCollection } from '../../../../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../../../../customSpecialComponents';
import { fieldData, statusCollection } from '../../../../../Simple/Common/data';

const { SinglePageSelectDrawer } = DataSinglePageView;

const visibleFlag = '94f54e3085974ebca2dd0b4f92868ec6';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageFrontendPaginationMultiSelectDrawer extends SinglePageSelectDrawer {
  showCallProcess = true;

  reloadWhenShow = true;

  useFrontendPagination = true;

  confirmSelect = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'simple/singleList',
      listViewMode: listViewConfig.viewMode.table,
      tableScrollX: 1620,
    };
  }

  getPresetPageName = () => {
    return '数据单页选择列表';
  };

  getStatusBadge = (v) => {
    let result = 'default';

    switch (v) {
      case statusCollection.online: {
        result = 'processing';
        break;
      }

      case statusCollection.offline: {
        result = 'warning';
        break;
      }

      default: {
        result = 'default';
        break;
      }
    }

    return result;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  buildSelectNotificationDescription = (o) => {
    if (isArray(o)) {
      let list = [];

      for (const item of o) {
        const { title } = item;
        list.push(title);
      }

      if (list.length > 0) {
        return \`已选择: \${list.join(',')}\`;
      }

      return '';
    } else {
      const { title } = o;

      return \`已选择: \${title}\`;
    }
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 780,
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
      dataTarget: fieldData.renderType,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfig: {
        color: colorCollection.price,
      },
      formatValue: (value) => {
        return getSimpleRenderTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: this.getStatusBadge(value),
          text: getSimpleStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.simpleId,
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
    columnPlaceholder,
  ];
}

export default SimpleSinglePageFrontendPaginationMultiSelectDrawer;
`;
