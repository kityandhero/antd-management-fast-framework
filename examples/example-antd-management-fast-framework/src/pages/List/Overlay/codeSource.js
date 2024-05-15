export const code = `import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import {
  buildRandomHexColor,
  columnFacadeMode,
  columnPlaceholder,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import { Card } from 'antd-management-fast-formily';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { refreshCacheAction } from '../../../businessAssists/action';
import { getStatusBadge } from '../../../businessAssists/tools';
import { fieldData } from '../../../businessData/data';
import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../customSpecialComponents';

import { code as codeView } from './codeSource';

const { MultiPage } = DataMultiPageView;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class PageList extends MultiPage {
  showCallProcess = true;

  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 4,
  };

  componentAuthority = accessWayCollection.simple.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.table,
      showOverlay: true,
      pageTitle: '列表示例',
      paramsKey: accessWayCollection.simple.pageList.paramsKey,
      loadApiPath: 'simple/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
      currentCode: codeView,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const simpleId = getValueByKey({
      data: handleData,
      key: fieldData.simpleId.name,
    });

    handleItem({
      target,
      value: simpleId,
      compareValueHandler: (o) => {
        const { simpleId: v } = o;

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
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.simpleId,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
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
        text: '增加信息',
        // handleClick: this.goToAdd,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '编辑',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      confirm: true,
      title: '将要进行编辑，确定吗？',
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.refreshCache.permission,
          ),
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 620,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.image,
      width: 100,
      showRichFacade: true,
      facadeConfig: {
        circle: false,
      },
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.sort,
      width: 100,
      showRichFacade: true,
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value,
          }),
        };
      },
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
          status: getStatusBadge(value),
          text: getSimpleStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.simpleId,
      width: 140,
      align: 'center',
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

  renderPresetContentFooter = () => {
    const { currentCode } = this.state;

    return (
      <Card title="代码示例">
        <SyntaxHighlighter
          language="js"
          value={currentCode}
          showLineNumbers={false}
          wrapLines={false}
        />
      </Card>
    );
  };
}

export default PageList;
`;
