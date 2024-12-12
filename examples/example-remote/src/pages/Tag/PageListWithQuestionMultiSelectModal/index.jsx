import { Avatar, Divider, List, Space, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { getTagStatusName } from '../../../customSpecialComponents';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { Text } = Typography;
const { MultiPageSelectModal } = DataMultiPageView;

const visibleFlag = '68f7e5fc318a4e11b918f48ac14edb8b';

@connect(({ tag, schedulingControl }) => ({
  tag,
  schedulingControl,
}))
class PageListWithQuestionMultiSelectModal extends MultiPageSelectModal {
  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '标签选择列表',
      loadApiPath: 'tag/pageListWithQuestion',
      listViewMode: listViewConfig.viewMode.table,
      showSelect: true,
      tableScrollX: 1020,
    };
  }

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

  // 配置列表显示模式构建逻辑
  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    const tagId = getValueByKey({
      data: item,
      key: fieldData.tagId.name,
    });

    const image = getValueByKey({
      data: item,
      key: fieldData.image.name,
    });

    const name = getValueByKey({
      data: item,
      key: fieldData.name.name,
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
              <Text>{name}</Text>
            </>
          }
          description={
            <Space split={<Divider type="vertical" />}>
              <ColorText
                textPrefix={fieldData.tagId.label}
                separator=": "
                text={<Text copyable>{tagId}</Text>}
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

  // 配置 table 显示模式数据列
  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.displayName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
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
          text: getTagStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.tagId,
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

export { PageListWithQuestionMultiSelectModal };
