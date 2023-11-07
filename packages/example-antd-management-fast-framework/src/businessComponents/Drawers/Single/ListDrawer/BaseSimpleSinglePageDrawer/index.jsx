import { Avatar, Divider, List, Space, Typography } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  columnPlaceholder,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  ColorText,
  convertOptionOrRadioData,
  iconBuilder,
  SyntaxHighlighter,
} from 'antd-management-fast-component';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { refreshCacheAction } from '../../../../../businessAssists/action';
import { fieldData, statusCollection } from '../../../../../businessData/data';
import { colorCollection } from '../../../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../../../customSpecialComponents';

const { Text } = Typography;
const { SinglePageSelectDrawer } = DataSinglePageView;

// 组件基类, 仅为代码复用性设计, 具体使用时请自行考虑
class BaseSimpleSinglePageDrawer extends SinglePageSelectDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  // 显示时是否自动刷新数据;
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '数据单页选择列表',
      // 页面加载时自动加载的远程请求
      loadApiPath: 'simple/singleList',
      // 设置默认试图模式为 table
      listViewMode: listViewConfig.viewMode.table,
      // table 显示模式行长度, 合理设置可以提升美观以及用户体验，超出可见区域将显示滚动条
      tableScrollX: 1220,
      sourceCode: '',
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
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

  // 配置搜索框
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

  // 配置动作集合
  establishDataContainerExtraActionCollectionConfig = () => {
    const { listViewMode } = this.state;

    return [
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.flexSelect,
        label: '显示模式',
        size: 'small',
        defaultValue: listViewMode,
        style: { width: '190px' },
        list: [
          {
            flag: listViewConfig.viewMode.table,
            name: '表格视图',
            availability: whetherNumber.yes,
          },
          {
            flag: listViewConfig.viewMode.list,
            name: '列表视图',
            availability: whetherNumber.yes,
          },
          {
            flag: listViewConfig.viewMode.cardCollectionView,
            name: '卡片视图',
            availability: whetherNumber.yes,
          },
          {
            flag: listViewConfig.viewMode.customView,
            name: '自定义视图',
            availability: whetherNumber.yes,
          },
        ],
        dataConvert: convertOptionOrRadioData,
        onChange: (v, option) => {
          console.log({ v, option });
          this.setState({ listViewMode: v });
        },
      },
    ];
  };

  // 配置列表显示模式构建逻辑
  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    const simpleId = getValueByKey({
      data: item,
      key: fieldData.simpleId.name,
    });

    const image = getValueByKey({
      data: item,
      key: fieldData.image.name,
    });

    const title = getValueByKey({
      data: item,
      key: fieldData.title.name,
    });

    const createTime = getValueByKey({
      data: item,
      key: fieldData.createTime.name,
      format: formatCollection.datetime,
    });

    return (
      <>
        <List.Item.Meta
          avatar={
            checkStringIsNullOrWhiteSpace(image) ? (
              <Avatar icon={iconBuilder.user()} />
            ) : (
              <Avatar src={image} />
            )
          }
          title={
            <>
              <Text>{title}</Text>
            </>
          }
          description={
            <Space split={<Divider type="vertical" />}>
              <ColorText
                textPrefix={fieldData.simpleId.label}
                separator=": "
                text={<Text copyable>{simpleId}</Text>}
              />

              <ColorText
                textPrefix={fieldData.createTime.label}
                separator=": "
                text={createTime}
              />
            </Space>
          }
        />
      </>
    );
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '刷新',
      placement: 'topRight',
      icon: iconBuilder.reload(),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: record,
      confirm: true,
      title: '将要刷新缓存，确定吗？',
    };
  };

  // 配置 table 显示模式数据列
  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 420,
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
    // 站位符, 显示为 "--"
    columnPlaceholder,
  ];

  renderOverlayContent = () => {
    const { sourceCode } = this.state;

    return (
      <div style={{ width: '90%', height: '90%' }}>
        <SyntaxHighlighter
          language="js"
          value={sourceCode}
          other={{ showLineNumbers: false, wrapLines: false }}
          style={{ height: '100%' }}
        />
      </div>
    );
  };
}

export { BaseSimpleSinglePageDrawer };
