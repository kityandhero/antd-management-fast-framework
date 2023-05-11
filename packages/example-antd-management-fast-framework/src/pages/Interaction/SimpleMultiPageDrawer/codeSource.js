export const code = `import { Avatar, Divider, List, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  formatCollection,
  getValueByKey,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  columnPlaceholder,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { colorCollection } from '../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../customSpecialComponents';
import { fieldData, statusCollection } from '../../Simple/Common/data';

const { Text } = Typography;
const { MultiPageDrawer } = DataMultiPageView;

const visibleFlag = 'eced74e7982a48adbb394fd8257c6018';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleMultiPageDrawer extends MultiPageDrawer {
  showCallProcess = true;

  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'simple/pageList',
      listViewMode: listViewConfig.viewMode.list,
      tableScrollY: 600,
    };
  }

  getPresetPageName = () => {
    return '数据分页列表';
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

  establishListItemDropdownConfig = (record) => {
    const itemStatus = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '按钮',
      placement: 'topRight',
      icon: iconBuilder.form(),
      // eslint-disable-next-line no-unused-vars
      handleButtonClick: ({ handleData }) => {
        const { title } = handleData;

        showSimpleInfoMessage(\`点击按钮 \${title}\`);
      },
      handleData: record,
      confirm: true,
      title: '将要点击按钮，确定吗？',
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'button1',
          icon: iconBuilder.edit(),
          text: 'button1',
        },
        {
          key: 'button2',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.playCircle(),
          text: 'button2',
          disabled: itemStatus === statusCollection.online,
          confirm: true,
          title: '将要点击button2, 确定吗?',
        },
        {
          key: 'button3',
          icon: iconBuilder.pauseCircle(),
          text: 'button3',
          disabled: itemStatus === statusCollection.offline,
          confirm: true,
          title: '将要点击button3, 确定吗?',
        },
        {
          key: 'button4',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.edit(),
          text: 'button4',
        },
        {
          key: 'button5',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: 'button5',
          confirm: true,
          title: '将要点击button5, 确定吗?',
        },
      ],
    };
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
  ];
}

export default SimpleMultiPageDrawer;
`;
