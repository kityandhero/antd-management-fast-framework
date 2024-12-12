import { List } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  whetherNumber,
  whetherString,
} from 'easy-soft-utility';

import { listViewConfig, searchCardConfig } from 'antd-management-fast-common';
import {
  buildIconInfoList,
  ColorText,
  FlexText,
  iconBuilder,
  StatusBar,
} from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

const visibleFlag = '84ae32350cae4ff186eb19854a1dde30';

@connect(({ channelSqlLogSwitch, schedulingControl }) => ({
  channelSqlLogSwitch,
  schedulingControl,
}))
class PageListDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '日志开关',
      loadApiPath: 'channelSqlLogSwitch/pageList',
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  handleItemValue = ({ target, handleData, remoteData }) => {
    const tag = getValueByKey({
      data: handleData,
      key: fieldData.tag.name,
    });

    handleItem({
      target,
      value: tag,
      compareValueHandler: (o) => {
        const { tag: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.value.name] = getValueByKey({
          data: remoteData,
          key: fieldData.value.name,
        });

        return d;
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  setEnable = (record) => {
    setEnableAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemValue({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (record) => {
    setDisableAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemValue({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.refreshData({});
      },
    });
  };

  establishListItemDropdownConfig = (record) => {
    const value = getValueByKey({
      data: record,
      key: fieldData.value.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '刷新缓存',
      placement: 'refreshCache',
      icon: iconBuilder.reload(),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      confirm: true,
      title: '即将刷新缓存，确定吗？',
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '开启SQL日志记录',
          disabled: value === whetherNumber.yes,
          confirm: true,
          title: '即将开启SQL日志记录,确定吗?',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '关闭SQL日志记录',
          disabled: value === whetherNumber.no,
          confirm: true,
          title: '即将关闭SQL日志记录,确定吗?',
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
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.value,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishListViewSize = () => {
    return 'small';
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (record, index) => {
    const title = getValueByKey({
      data: record,
      key: fieldData.title.name,
    });

    const tag = getValueByKey({
      data: record,
      key: fieldData.tag.name,
    });

    const key = getValueByKey({
      data: record,
      key: fieldData.key.name,
    });

    const value = getValueByKey({
      data: record,
      key: fieldData.value.name,
      convert: convertCollection.string,
    });

    return (
      <div style={{ paddingRight: '6px' }}>
        <List.Item.Meta
          title={
            <ColorText
              textPrefix={fieldData.title.label}
              text={title}
              separatorStyle={{ padding: '0 4px 0 2px' }}
            />
          }
          description={
            <div>
              <FlexText
                textPrefix={fieldData.key.label}
                separatorStyle={{ padding: '0 4px 0 2px' }}
                text={key}
                extra={
                  <ColorText
                    textPrefix={fieldData.value.label}
                    text={value === whetherString.yes ? '是' : '否'}
                    separatorStyle={{ padding: '0 4px 0 2px' }}
                    randomColor
                    randomSeed={value * 40 + 30}
                    seedOffset={18}
                  />
                }
              />
            </div>
          }
        />

        <div>
          <StatusBar
            actions={buildIconInfoList({
              list: [
                {
                  textPrefix: fieldData.tag.label,
                  text: tag,
                  separatorStyle: { padding: '0 4px 0 2px' },
                  canCopy: true,
                },
              ],
            })}
            extra={this.renderPresetListItemDropdown(record)}
          />
        </div>
      </div>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.key,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.value,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.tag,
      width: 140,
      showRichFacade: true,
      canCopy: true,
    },
  ];
}

export { PageListDrawer };
