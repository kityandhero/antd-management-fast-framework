import { Avatar, Typography } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  formatCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  columnPlaceholder,
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  ColorText,
  convertOptionOrRadioData,
  iconBuilder,
  SyntaxHighlighter,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { fieldData, statusCollection } from '../../../../../businessData/data';
import { colorCollection } from '../../../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../../../customSpecialComponents';

const { Text } = Typography;
const { MultiPageSelectModal } = DataMultiPageView;

// 组件基类, 仅为代码复用性设计, 具体使用时请自行考虑
class BaseSimpleMultiPageSelectModal extends MultiPageSelectModal {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  // 显示时是否自动刷新数据;
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '数据分页选择列表',
      // 页面加载时自动加载的远程请求
      loadApiPath: 'simple/pageList',
      // 设置默认试图模式为 table
      listViewMode: listViewConfig.viewMode.table,
      listViewItemLayout: 'horizontal',
      // table 显示模式行长度, 合理设置可以提升美观以及用户体验，超出可见区域将显示滚动条
      tableScrollX: 1220,
      sourceCode: '',
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

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

  establishListViewItemLayout = () => {
    const { listViewItemLayout } = this.state;

    return listViewItemLayout;
  };

  // 配置搜索框
  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
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

  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldData.image.name,
        defaultValue: defaultEmptyImage,
      }),
    });
  };

  // 配置动作集合
  establishDataContainerExtraActionCollectionConfig = () => {
    const { listViewMode, listViewItemLayout } = this.state;

    return [
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.flexSelect,
        label: '列表布局',
        size: 'small',
        defaultValue: listViewItemLayout,
        style: { width: '190px' },
        hidden: listViewMode !== listViewConfig.viewMode.list,
        list: [
          {
            flag: 'horizontal',
            name: '水平布局',
            availability: whetherNumber.yes,
          },
          {
            flag: 'vertical',
            name: '垂直布局',
            availability: whetherNumber.yes,
          },
        ],
        dataConvert: convertOptionOrRadioData,
        // eslint-disable-next-line no-unused-vars
        onChange: (v, option) => {
          this.setState({ listViewItemLayout: v });
        },
      },
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
  establishPresetListViewItemInnerConfig = (item, index) => {
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

    const description = getValueByKey({
      data: item,
      key: fieldData.description.name,
      defaultValue: '暂无简介',
    });

    const contentData = getValueByKey({
      data: item,
      key: fieldData.contentData.name,
      defaultValue: '暂无详情',
    });

    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const createTime = getValueByKey({
      data: item,
      key: fieldData.createTime.name,
      format: formatCollection.datetime,
    });

    const config = {
      image: checkStringIsNullOrWhiteSpace(image) ? (
        <Avatar icon={iconBuilder.user()} />
      ) : (
        <Avatar src={image} />
      ),
      title: {
        label: '标题前缀',
        text: title || '无标题',
      },
      descriptionList: [
        {
          label: fieldData.description.label,
          text: description || '无描述',
          color: '#999999',
        },
        {
          label: fieldData.contentData.label,
          text: contentData || '无内容',
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={fieldData.status.label}
              text={getSimpleStatusName({
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
          label: fieldData.simpleId.label,
          text: simpleId,
          canCopy: true,
          color: '#999999',
        },
        {
          label: '其他',
          text: (
            <div>
              <Text copyable>示例文字</Text>
            </div>
          ),
        },
        {
          label: fieldData.createTime.label,
          text: createTime,
          color: '#999999',
        },
      ],
    };

    return config;
  };

  // 配置 table 显示模式数据列
  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 360,
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

export default BaseSimpleMultiPageSelectModal;
