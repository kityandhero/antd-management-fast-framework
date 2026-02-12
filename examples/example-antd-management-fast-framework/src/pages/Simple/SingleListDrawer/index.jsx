import { Avatar, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  cardConfig,
  columnFacadeMode,
  columnPlaceholder,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { buildColorText, iconBuilder } from 'antd-management-fast-component';
import {
  DataSinglePageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData, statusCollection } from '../../../businessData/data';
import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../customSpecialComponents';

const { Text } = Typography;
const { SinglePageSelectDrawer } = DataSinglePageView;

const visibleFlag = 'c9ad8f7b4f874cbab64ae0a0e1f305fd';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SingleListDrawer extends SinglePageSelectDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.simple.singleList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '请选择文章',
      loadApiPath: 'simple/singleList',
      listViewMode: listViewConfig.viewMode.list,
      tableScrollY: 600,
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
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

  establishPageContentLayoutSiderConfig = () => {
    return {
      position: 'left',
    };
  };

  establishSiderTopAreaConfig = () => {
    return {
      mode: cardConfig.wrapperType.page,
      list: [
        {
          title: {
            text: '基本信息',
            subText: buildColorText({
              textPrefix: '文本前缀',
              text: '附属文本',
              color: '#8909ef',
              wrapperBuilder: (c) => {
                return <>【{c}】</>;
              },
            }),
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
                size: 'small',
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              showLine: true,
              switcherIcon: iconBuilder.down(),
              defaultExpandedKeys: ['0-0-0'],
              listData: [
                {
                  title: 'parent 1',
                  key: '0-0',
                  children: [
                    {
                      title: 'parent 1-0',
                      key: '0-0-0',
                      children: [
                        {
                          title: 'leaf',
                          key: '0-0-0-0',
                        },
                        {
                          title: 'leaf',
                          key: '0-0-0-1',
                        },
                        {
                          title: 'leaf',
                          key: '0-0-0-2',
                        },
                      ],
                    },
                    {
                      title: 'parent 1-1',
                      key: '0-0-1',
                      children: [
                        {
                          title: 'leaf',
                          key: '0-0-1-0',
                        },
                      ],
                    },
                    {
                      title: 'parent 1-2',
                      key: '0-0-2',
                      children: [
                        {
                          title: 'leaf',
                          key: '0-0-2-0',
                        },
                        {
                          title: 'leaf',
                          key: '0-0-2-1',
                        },
                      ],
                    },
                  ],
                },
              ],
              innerProps: {
                defaultExpandAll: true,
              },
              onSelect: (
                selectedKeys,
                o,
                { selectedNodes, node, treeData },
              ) => {
                console.log({ selectedNodes, node, treeData });
              },
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '这是一些操作说明1',
              },
              {
                text: '这是一些操作说明2',
              },
            ],
          },
        },
      ],
    };
  };

  establishSiderBottomAreaConfig = () => {
    return {
      mode: cardConfig.wrapperType.page,
      list: [
        {
          title: {
            text: '基本信息',
            subText: buildColorText({
              textPrefix: '文本前缀',
              text: '附属文本',
              color: '#8909ef',
              wrapperBuilder: (c) => {
                return <>【{c}】</>;
              },
            }),
          },
          items: [
            {
              buildType: cardConfig.extraBuildType.iconInfo,
              icon: iconBuilder.infoCircle(),
              text: '一些说明',
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '这是一些操作说明1',
              },
              {
                text: '这是一些操作说明2',
              },
            ],
          },
        },
      ],
    };
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
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

  // eslint-disable-next-line no-unused-vars
  establishPresetListViewItemInnerConfig = (data, index) => {
    const simpleId = getValueByKey({
      data: data,
      key: fieldData.simpleId.name,
    });

    const title = getValueByKey({
      data: data,
      key: fieldData.title.name,
    });

    const image = getValueByKey({
      data: data,
      key: fieldData.image.name,
    });

    const createTime = getValueByKey({
      data: data,
      key: fieldData.createTime.name,
      format: formatCollection.datetime,
    });

    return {
      image: checkStringIsNullOrWhiteSpace(image) ? (
        <Avatar icon={iconBuilder.user()} />
      ) : (
        <Avatar src={image} />
      ),
      title: {
        text: title,
      },
      descriptionList: [
        {
          label: fieldData.description.label,
          text: getValueByKey({
            data: data,
            key: fieldData.description.name,
          }),
          color: '#999999',
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

export default SingleListDrawer;
