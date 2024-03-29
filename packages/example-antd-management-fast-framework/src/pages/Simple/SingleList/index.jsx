import { List } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showInfoMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  columnFacadeMode,
  columnPlaceholder,
  extraBuildType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import {
  buildButton,
  buildCustomGrid,
  buildFlexRadio,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataSinglePageView } from 'antd-management-fast-framework';

import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../../../businessAssists/action';
import { getStatusBadge } from '../../../businessAssists/tools';
import { fieldData, statusCollection } from '../../../businessData/data';
import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
  renderSearchSimpleRenderTypeSelect,
  renderSearchSimpleStatusSelect,
} from '../../../customSpecialComponents';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import ChangeSortModal from '../ChangeSortModal';
import SingleListDrawer from '../SingleListDrawer';
import UpdateBasicInfoDrawer from '../UpdateBasicInfoDrawer';

const { SinglePage } = DataSinglePageView;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SingleList extends SinglePage {
  // showCallProcess = true;

  loadRemoteRequestDelay = 3000;

  useFrontendPagination = true;

  componentAuthority = accessWayCollection.simple.singleList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageSize: 8,
      pageTitle: '文章单页列表',
      loadApiPath: 'simple/singleList',
      listViewMode: listViewConfig.viewMode.table,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showUpdateBasicInfoDrawer': {
        this.showUpdateBasicInfoDrawer(handleData);
        break;
      }

      case 'setOnline': {
        this.setOnline(handleData);
        break;
      }

      case 'setOffline': {
        this.setOffline(handleData);
        break;
      }

      case 'setSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  handleItemStatus = ({ target, record, remoteData }) => {
    const simpleId = getValueByKey({
      data: remoteData,
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

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showSingleListDrawer = () => {
    SingleListDrawer.open();
  };

  afterSingleListDrawerOk = () => {
    this.refreshData({});
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = () => {
    this.refreshData({});
  };

  showUpdateBasicInfoDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        UpdateBasicInfoDrawer.open();
      },
    );
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.refreshData({});
  };

  showChangeSortModal = (currentRecord) => {
    this.setState({ currentRecord });
  };

  afterChangeSortModalOk = ({
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  }) => {
    const that = this;

    if (singleData == null) {
      that.reloadData({});
    } else {
      const simpleId = getValueByKey({
        data: singleData,
        key: fieldData.simpleId.name,
      });

      handleItem({
        target: that,
        value: simpleId,
        compareValueHandler: (o) => {
          const { simpleId: v } = o;

          return v;
        },
        handler: (d) => {
          const o = d;

          o[fieldData.sort.name] = getValueByKey({
            data: singleData,
            key: fieldData.sort.name,
          });

          return d;
        },
      });
    }
  };

  goToAdd = () => {
    this.goToPath(`/simple/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { simpleId } = record;

    this.goToPath(`/simple/edit/load/${simpleId}/key/basicInfo`);
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.iconInfo,
          icon: iconBuilder.infoCircle(),
          text: '一些说明',
        },
        {
          buildType: extraBuildType.button,
          icon: iconBuilder.form(),
          text: '按钮',
          handleClick: () => {},
        },
      ],
    };
  };

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: buildButton({
            text: '按钮1',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '按钮提示4',
          hidden: false,
          component: buildButton({
            text: '按钮4',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            confirm: true,
            placement: 'topRight',
            title: '将要进行操作，确定吗？',
            okText: '确定',
            cancelText: '取消',
          }),
        },
      ],
    };
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.renderType.name] = unlimitedWithStringFlag.key;
    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchSimpleRenderTypeSelect({}),
        },
        {
          lg: 12,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardRangePickerCore(dateRangeFieldName),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.selectWhether,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.whetherRadio,
          fieldData: fieldData.selectRadio,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchSimpleStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraAffixConfig = () => {
    return {
      affix: true,
      offsetTop: 10,
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    const { listViewMode } = this.state;

    return [
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.component,
        component: buildFlexRadio({
          label: '显示模式',
          size: 'small',
          defaultValue: listViewMode,
          button: true,
          list: [
            {
              flag: listViewConfig.viewMode.table,
              name: 'TableView',
              availability: whetherNumber.yes,
            },
            {
              flag: listViewConfig.viewMode.list,
              name: 'ListView',
              availability: whetherNumber.yes,
            },
            {
              flag: listViewConfig.viewMode.cardCollectionView,
              name: 'CardView',
              availability: whetherNumber.yes,
            },
            {
              flag: listViewConfig.viewMode.customView,
              name: 'CustomView',
              availability: whetherNumber.yes,
            },
          ],
          dataConvert: (o) => {
            const { flag, name } = o;

            return { label: name, value: flag, disabled: false, ...o };
          },
          onChange: (v) => {
            this.setState({
              listViewMode: v,
              showSelect: v === listViewConfig.viewMode.table,
            });
          },
        }),
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        icon: iconBuilder.plus(),
        text: '刷新效果',
        handleClick: () => {
          this.refreshDataWithReloadAnimalPrompt({});
        },
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.sortAscending(),
        text: '侧拉单页列表',
        handleClick: this.showSingleListDrawer,
        hidden: !checkHasAuthority(
          accessWayCollection.simple.addBasicInfo.permission,
        ),
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增文章[侧拉]',
        handleClick: this.showAddBasicInfoDrawer,
        hidden: !checkHasAuthority(
          accessWayCollection.simple.addBasicInfo.permission,
        ),
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增文章[页面]',
        handleClick: this.goToAdd,
        hidden: !checkHasAuthority(
          accessWayCollection.simple.addBasicInfo.permission,
        ),
      },
    ];
  };

  establishCardCollectionViewItemConfig = (record) => {
    return {
      title: {
        text: getValueByKey({
          data: record,
          key: fieldData.title.name,
        }),
      },
      useAnimal: true,
      animalType: cardConfig.animalType.queue,
      bordered: true,
      extra: {
        split: false,
        list: [
          {
            buildType: cardConfig.extraBuildType.iconInfo,
            icon: iconBuilder.infoCircle(),
            text: '一些说明',
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            icon: iconBuilder.form(),
            text: '一般按钮',
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            hidden: true,
            icon: iconBuilder.form(),
            text: '隐藏按钮',
          },
        ],
      },
      items: [
        {
          lg: 24,
          type: cardConfig.contentItemType.component,
          component: buildCustomGrid({
            list: [
              {
                label: fieldData.title.label,
                value: getValueByKey({
                  data: record,
                  key: fieldData.title.name,
                }),
              },
              {
                label: fieldData.subtitle.label,
                value: getValueByKey({
                  data: record,
                  key: fieldData.subtitle.name,
                }),
              },
              {
                label: fieldData.renderTypeNote.label,
                value: getValueByKey({
                  data: record,
                  key: fieldData.renderTypeNote.name,
                }),
              },
              {
                label: fieldData.statusNote.label,
                value: getValueByKey({
                  data: record,
                  key: fieldData.statusNote.name,
                }),
              },
            ],
            props: {
              bordered: true,
              column: 4,
              labelStyle: {
                width: '160px',
              },
              emptyValue: '暂无',
              emptyStyle: {
                color: '#ccc',
              },
            },
          }),
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
      text: '编辑',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      confirm: true,
      title: '将要点击按钮，确定吗？',
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showUpdateBasicInfoDrawer',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.edit(),
          text: '编辑[侧拉]',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateBasicInfo.permission,
          ),
        },
        {
          key: 'setOnline',
          icon: iconBuilder.playCircle(),
          text: '设为上线',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOnline.permission,
          ),
          disabled: itemStatus === statusCollection.online,
          confirm: true,
          title: '将要设置为上线，确定吗？',
        },
        {
          key: 'setOffline',
          icon: iconBuilder.pauseCircle(),
          text: '设为下线',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOffline.permission,
          ),
          disabled: itemStatus === statusCollection.offline,
          confirm: true,
          title: '将要设置为下线，确定吗？',
        },
        {
          key: 'setSort',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateSort.permission,
          ),
        },
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

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (r, index) => {
    return (
      <>
        <List.Item.Meta
          title={getValueByKey({
            data: r,
            key: fieldData.title.name,
          })}
          description={getValueByKey({
            data: r,
            key: fieldData.description.name,
          })}
        />
      </>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 680,
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '分页模式:单页数据默认会启用前台模拟分页，分页试图有助于解决长列表渲染情况下的页面卡顿情况。',
        },
        {
          text: '模式变更:如若不需要模拟分页展示，可以通过设置 this.useFrontendPagination = false 来关闭。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { simpleId, currentRecord } = this.state;

    const renderChangeSortModal = checkHasAuthority(
      accessWayCollection.simple.updateSort.permission,
    );

    return (
      <>
        <SingleListDrawer
          width={1200}
          afterOK={() => {
            this.showSingleListDrawer();
          }}
        />

        <AddBasicInfoDrawer
          externalData={{ simpleId }}
          afterOK={() => {
            this.afterAddBasicInfoDrawerOk();
          }}
        />

        <UpdateBasicInfoDrawer
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateBasicInfoDrawerOk();
          }}
        />

        {renderChangeSortModal ? (
          <ChangeSortModal
            externalData={currentRecord}
            afterOK={this.afterChangeSortModalOk}
          />
        ) : null}
      </>
    );
  };
}

export default SingleList;
