import { Avatar, Divider, List, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
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
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataSinglePageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { colorCollection } from '../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../customSpecialComponents';
import { fieldData, statusCollection } from '../../Simple/Common/data';

const { Text } = Typography;
const { SinglePageDrawer } = DataSinglePageView;

const visibleFlag = 'b354b02508d747ecacedc90e6c86c4a1';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageDrawer extends SinglePageDrawer {
  showCallProcess = true;

  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'simple/singleList',
      listViewMode: listViewConfig.viewMode.list,
      tableScrollY: 600,
    };
  }

  getPresetPageName = () => {
    return '数据单页列表';
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
      // {
      //   buildType:
      //     listViewConfig.dataContainerExtraActionBuildType.generalButton,
      //   type: 'primary',
      //   icon: iconBuilder.plus(),
      //   text: '新增文章[侧拉]',
      //   handleClick: this.showAddBasicInfoDrawer,
      // },
      // {
      //   buildType:
      //     listViewConfig.dataContainerExtraActionBuildType.generalButton,
      //   type: 'primary',
      //   icon: iconBuilder.plus(),
      //   confirm: true,
      //   title: '即将跳转新增数据页面，确定吗？',
      //   text: '新增文章[页面]',
      //   handleClick: this.goToAdd,
      // },
    ];
  };

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
            <>
              <Text>{fieldData.simpleId.label}:</Text>
              <Text copyable>{simpleId}</Text>
              <Divider type="vertical" />
              <Text>{fieldData.createTime.label}:</Text>
              <Text>{createTime}</Text>
            </>
          }
        />
      </>
    );
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
    {
      dataTarget: fieldData.customOperate,
      width: 106,
      fixed: 'right',
      render: (text, record) => {
        return this.renderPresetSelectButton({
          handleData: record,
        });
      },
    },
  ];
}

export default SimpleSinglePageDrawer;
