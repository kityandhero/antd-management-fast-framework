import { List } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  isArray,
  replaceWithKeep,
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
  buildColorText,
  buildCustomGrid,
  buildFlexRadio,
  buildTagList,
  iconBuilder,
  RowExpandTable,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/config';
import { colorCollection } from '../../../customConfig/constants';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
  renderSearchSimpleRenderTypeSelect,
  renderSearchSimpleStatusSelect,
} from '../../../customSpecialComponents';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import ChangeSortModal from '../ChangeSortModal';
import { fieldData, mediaItemData, statusCollection } from '../Common/data';
import SimpleSelectField from '../SelectField';
import UpdateBasicInfoDrawer from '../UpdateBasicInfoDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class PageList extends MultiPage {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  loadRemoteRequestDelay = 100;
  pageRemoteRequestDelay = 100;

  restoreSearch = true;

  // showSearchForm = false;

  //在控制台中显示渲染次数，仅用于调试
  // showRenderCountInConsole = true;

  componentAuthority = accessWayCollection.simple.pageList.permission;
  paramsKey = accessWayCollection.simple.pageList.paramsKey;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      showSelect: true,
      pageTitle: '文章列表',
      listViewMode: listViewConfig.viewMode.table,
      pageSize: 8,
      tableScrollX: 1620,
      loadApiPath: 'simple/pageList',
      changeSortModalVisible: false,
      updateBasicInfoDrawerVisible: false,
      currentRecord: null,
      simpleId: '',
      simpleTitle: '',
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showUpdateBasicInfoDrawer': {
        this.showUpdateBasicInfoDrawer(handleData);
        break;
      }

      case 'contentInfo': {
        this.goToEditContent(handleData);
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

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = ({ subjoinData }) => {
    console.log({ subjoinData });

    this.refreshData({ delay: 300 });
  };

  afterAddBasicInfoDrawerCancel = () => {};

  afterAddBasicInfoDrawerClose = () => {};

  showUpdateBasicInfoDrawer = (r) => {
    this.setState({
      currentRecord: r,
    });
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.refreshData({ delay: 300 });
  };

  afterUpdateBasicInfoDrawerCancel = () => {};

  afterUpdateBasicInfoDrawerClose = () => {};

  showChangeSortModal = (currentRecord) => {
    this.setState({ changeSortModalVisible: true, currentRecord });
  };

  afterChangeSortModalOk = ({
    // eslint-disable-next-line no-unused-vars
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

    that.setState({
      changeSortModalVisible: false,
    });
  };

  afterChangeSortModalCancel = () => {
    this.setState({
      changeSortModalVisible: false,
    });
  };

  afterSimpleSelect = (d) => {
    const { simpleId, title } = d;

    this.setState({
      simpleId: simpleId || '',
      simpleTitle: title || '',
    });

    this.setSearchFormFieldsValue({
      simpleId: simpleId || '',
      simpleTitle: title || '',
    });
  };

  afterSimpleClearSelect = () => {
    this.setState({
      simpleId: '',
      simpleTitle: '',
    });

    this.setSearchFormFieldsValue({
      simpleId: '',
      simpleTitle: '',
    });
  };

  handleAdditionalSearchReset = () => {
    this.setState({
      simpleId: '',
      simpleTitle: '',
    });
  };

  goToAdd = () => {
    this.goToPath(`/simple/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { simpleId } = record;

    this.goToPath(`/simple/edit/load/${simpleId}/key/basicInfo`);
  };

  goToEditContent = (record) => {
    const { simpleId } = record;

    this.goToPath(`/simple/edit/load/${simpleId}/key/contentInfo`);
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
    const {
      dataLoading,
      processing,
      loadSuccess,
      dateRangeFieldName,
      simpleTitle,
    } = this.state;

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
          type: searchCardConfig.contentItemType.inputNumber,
          fieldData: fieldData.sort,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchSimpleStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: (
            <>
              <SimpleSelectField
                dataLoading={dataLoading}
                processing={processing}
                loadSuccess={loadSuccess}
                label={fieldData.title.label}
                title={simpleTitle || null}
                // helper={fieldData.title.helper}
                afterSelect={(d) => {
                  this.afterSimpleSelect(d);
                }}
                afterClearSelect={() => {
                  this.afterSimpleClearSelect();
                }}
              />
            </>
          ),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishTableExpandableConfig = () => {
    return {
      checkNeedExpander: (list) => {
        const result = (list || []).some((o) => {
          const { mediaItemList } = {
            mediaItemList: [],
            ...o,
          };

          return isArray(mediaItemList) ? mediaItemList.length > 0 : false;
        });

        return result;
      },
      rowExpandable: (record) => {
        const { mediaItemList } = {
          mediaItemList: [],
          ...record,
        };

        return isArray(mediaItemList) ? mediaItemList.length > 0 : false;
      },
      expanderStyle: {
        boxShadow: '0 2px 12px 2px #aaa',
        borderRadius: '4px',
      },
      animalType: listViewConfig.expandAnimalType.queue,
      // eslint-disable-next-line no-unused-vars
      expandedRowRender: (record, index, indent, expanded) => {
        const columns = this.buildColumnList([
          {
            dataTarget: mediaItemData.title,
            // width: 180,
            align: 'left',
            showRichFacade: true,
            emptyValue: '--',
          },
          {
            dataTarget: fieldData.createTime,
            width: 160,
            showRichFacade: true,
            facadeMode: columnFacadeMode.datetime,
            emptyValue: '--',
          },
        ]);

        return (
          <RowExpandTable
            tableConfig={{
              columns: columns,
              dataSource: record.mediaItemList,
              pagination: false,
            }}
          />
        );
      },
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
        confirm: true,
        title: '即将跳转新增数据页面，确定吗？',
        text: '新增文章[页面]',
        handleClick: this.goToAdd,
        hidden: !checkHasAuthority(
          accessWayCollection.simple.addBasicInfo.permission,
        ),
      },
    ];
  };

  establishCardCollectionViewItemConfig = (r) => {
    return {
      title: {
        image: getValueByKey({
          data: r,
          key: fieldData.image.name,
        }),
        imageCircle: false,
        icon: iconBuilder.picture(),
        hideIcon: false,
        hideIconWhenShowImage: true,
        text: getValueByKey({
          data: r,
          key: fieldData.title.name,
        }),
        textEllipsisMaxWidth: 240,
        subText: buildTagList({
          list: [
            {
              color: 'volcano',
              text: '推荐',
            },
            {
              color: 'geekblue',
              text: '热点',
            },
            {
              color: 'geekblue',
              text: '时政要闻',
              hidden: true,
            },
          ],
        }),
      },
      useAnimal: true,
      animalType: cardConfig.animalType.queue,
      bordered: true,
      extra: {
        split: true,
        list: [
          {
            buildType: cardConfig.extraBuildType.iconInfo,
            icon: iconBuilder.infoCircle(),
            text: '一些说明',
            canCopy: true,
          },
          {
            buildType: cardConfig.extraBuildType.iconInfo,
            icon: iconBuilder.infoCircle(),
            textPrefix: '复制',
            text: '自定义',
            canCopy: true,
            copyData: '要复制的文字',
          },
          {
            buildType: cardConfig.extraBuildType.iconInfo,
            icon: iconBuilder.infoCircle(),
            iconPosition: 'right',
            iconTooltip: '说明',
            textPrefix: '前缀',
            textPrefixStyle: {
              color: 'red',
            },
            separator: '-',
            separatorStyle: {
              color: 'green',
            },
            text: '一些说明一些说明一些说明',
            textStyle: {
              color: 'blue',
            },
            textFormat: (v) => {
              return replaceWithKeep(v, '***', 2, 6);
            },
            tooltip: true,
            tooltipColor: '#cdbda0',
            ellipsis: true,
            // ellipsisMaxWidth: 180,
            onClick: () => {
              showInfoMessage({
                text: 'onClick',
              });
            },
          },
          {
            buildType: cardConfig.extraBuildType.iconInfo,
            textPrefix: '标题',
            text: '上浮提示上浮提示上浮提示上浮提示上浮提示上浮提示上浮提示上浮提示',
            tooltip: true,
            ellipsisMaxWidth: 180,
          },
          {
            buildType: cardConfig.extraBuildType.colorText,
            textPrefix: '前缀',
            text: '后缀',
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
                span: 4,
                label: fieldData.title.label,
                value: getValueByKey({
                  data: r,
                  key: fieldData.title.name,
                }),
              },
              {
                span: 2,
                label: fieldData.subtitle.label,
                value: getValueByKey({
                  data: r,
                  key: fieldData.subtitle.name,
                }),
              },
              {
                label: fieldData.renderTypeNote.label,
                value: getValueByKey({
                  data: r,
                  key: fieldData.renderTypeNote.name,
                }),
              },
              {
                label: fieldData.statusNote.label,
                value: getValueByKey({
                  data: r,
                  key: fieldData.statusNote.name,
                }),
              },
            ],
            props: {
              bordered: true,
              column: 4,
              labelStyle: {
                width: '100px',
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

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (data, index) => {
    return (
      <>
        <List.Item.Meta
          title={getValueByKey({
            data: data,
            key: fieldData.title.name,
          })}
          description={getValueByKey({
            data: data,
            key: fieldData.description.name,
          })}
        />
      </>
    );
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
          key: 'showUpdateBasicInfoDrawer',
          icon: iconBuilder.edit(),
          text: '编辑[侧拉]',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateBasicInfo.permission,
          ),
        },
        {
          key: 'contentInfo',
          icon: iconBuilder.edit(),
          text: '编辑图文',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateContentInfo.permission,
          ),
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const {
      simpleId,
      updateBasicInfoDrawerVisible,
      changeSortModalVisible,
      currentRecord,
    } = this.state;

    const renderChangeSortModal = checkHasAuthority(
      accessWayCollection.simple.updateSort.permission,
    );

    return (
      <>
        <AddBasicInfoDrawer
          externalData={{ simpleId }}
          afterOK={({ subjoinData }) => {
            this.afterAddBasicInfoDrawerOk({ subjoinData });
          }}
          afterCancel={() => {
            this.afterAddBasicInfoDrawerCancel();
          }}
          afterClose={() => {
            this.afterAddBasicInfoDrawerClose();
          }}
        />

        <UpdateBasicInfoDrawer
          visible={updateBasicInfoDrawerVisible}
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateBasicInfoDrawerOk();
          }}
          afterCancel={() => {
            this.afterUpdateBasicInfoDrawerCancel();
          }}
          afterClose={() => {
            this.afterUpdateBasicInfoDrawerClose();
          }}
        />

        {renderChangeSortModal ? (
          <ChangeSortModal
            visible={changeSortModalVisible}
            externalData={currentRecord}
            afterOK={this.afterChangeSortModalOk}
            afterCancel={this.afterChangeSortModalCancel}
          />
        ) : null}
      </>
    );
  };

  establishSiderTopAreaConfig = () => {
    const spinning = this.checkInProgress();

    return {
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
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              showLine: true,
              switcherIcon: iconBuilder.down(),
              defaultExpandedKeys: ['0-0-0'],
              onSelect: () => {},
              treeData: [
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
    const spinning = this.checkInProgress();

    return {
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
          spinning,
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

  establishPageContentLayoutSiderConfig = () => {
    return {
      position: 'left',
    };
  };
}

export default PageList;
