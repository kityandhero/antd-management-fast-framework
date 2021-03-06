import { List } from 'antd';
import { connect } from 'umi';

import {
  buildCustomGrid,
  buildDropdownButton,
  buildRadioGroup,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';
import SinglePage from 'antd-management-fast-framework/es/framework/DataSinglePageView/SinglePage';
import { handleItem } from 'antd-management-fast-framework/es/utils/actionAssist';
import {
  cardConfig,
  columnFacadeMode,
  columnPlaceholder,
  convertCollection,
  extraBuildType,
  iconCollection,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
  whetherNumber,
} from 'antd-management-fast-framework/es/utils/constants';
import { getValueByKey, showInfoMessage } from 'antd-management-fast-framework/es/utils/tools';

import { accessWayCollection } from '@/customConfig/config';
import { colorCollection } from '@/customConfig/constants';
import {
  getArticleRenderTypeName,
  renderSearchArticleRenderTypeSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleRenderType';
import {
  getArticleStatusName,
  renderSearchArticleStatusSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import { refreshCacheAction, setOfflineAction, setOnlineAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import ChangeSortModal from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';
import SingleListDrawer from '../SingleListDrawer';
import UpdateBasicInfoDrawer from '../UpdateBasicInfoDrawer';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class SingleList extends SinglePage {
  useFrontendPagination = true;

  componentAuthority = accessWayCollection.article.singleList.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageSize: 8,
        pageName: '文章单页列表',
        paramsKey: accessWayCollection.article.singleList.permission,
        loadApiPath: 'article/singleList',
        listViewMode: listViewConfig.viewMode.table,
        changeSortModalVisible: false,
        addBasicInfoDrawerVisible: false,
        updateBasicInfoDrawerVisible: false,
        singleListDrawerVisible: false,
        currentRecord: null,
      },
    };
  }

  apiDataConvert = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showUpdateBasicInfoDrawer':
        this.showUpdateBasicInfoDrawer(handleData);
        break;

      case 'setOnline':
        this.setOnline(handleData);
        break;

      case 'setOffline':
        this.setOffline(handleData);
        break;

      case 'setSort':
        this.showChangeSortModal(handleData);
        break;

      case 'refreshCache':
        this.refreshCache(handleData);
        break;

      default:
        break;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleItemStatus = ({ target, record, remoteData }) => {
    const articleId = getValueByKey({
      data: remoteData,
      key: fieldData.articleId.name,
    });

    handleItem({
      target,
      dataId: articleId,
      compareDataIdHandler: (o) => {
        const { articleId: v } = o;

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
    this.setState({
      singleListDrawerVisible: true,
    });
  };

  afterSingleListDrawerOk = () => {
    this.setState({ singleListDrawerVisible: false }, () => {
      const that = this;

      setTimeout(() => {
        that.refreshData();
      }, 500);
    });
  };

  afterSingleListDrawerCancel = () => {
    this.setState({ singleListDrawerVisible: false });
  };

  afterSingleListDrawerClose = () => {
    this.setState({ singleListDrawerVisible: false });
  };

  showAddBasicInfoDrawer = () => {
    this.setState({
      addBasicInfoDrawerVisible: true,
    });
  };

  afterAddBasicInfoDrawerOk = () => {
    this.setState({ addBasicInfoDrawerVisible: false }, () => {
      const that = this;

      setTimeout(() => {
        that.refreshData();
      }, 500);
    });
  };

  afterAddBasicInfoDrawerCancel = () => {
    this.setState({ addBasicInfoDrawerVisible: false });
  };

  afterAddBasicInfoDrawerClose = () => {
    this.setState({ addBasicInfoDrawerVisible: false });
  };

  showUpdateBasicInfoDrawer = (r) => {
    this.setState({
      updateBasicInfoDrawerVisible: true,
      currentRecord: r,
    });
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.setState({ updateBasicInfoDrawerVisible: false }, () => {
      const that = this;

      setTimeout(() => {
        that.refreshData();
      }, 500);
    });
  };

  afterUpdateBasicInfoDrawerCancel = () => {
    this.setState({ updateBasicInfoDrawerVisible: false });
  };

  afterUpdateBasicInfoDrawerClose = () => {
    this.setState({ updateBasicInfoDrawerVisible: false });
  };

  showChangeSortModal = (currentRecord) => {
    this.setState({ changeSortModalVisible: true, currentRecord });
  };

  afterChangeSortModalOk = ({
    singleData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData,
  }) => {
    const that = this;

    if (singleData != null) {
      const articleId = getValueByKey({
        data: singleData,
        key: fieldData.articleId.name,
      });

      handleItem({
        target: that,
        dataId: articleId,
        compareDataIdHandler: (o) => {
          const { articleId: v } = o;

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
    } else {
      that.reloadData();
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

  goToAdd = () => {
    this.goToPath(`/news/article/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { articleId } = record;

    this.goToPath(`/news/article/edit/load/${articleId}/key/basicInfo`);
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.iconInfo,
          icon: iconCollection.infoCircle,
          text: '一些说明',
        },
        {
          buildType: extraBuildType.button,
          icon: iconCollection.form,
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
          component: this.renderGeneralButton({
            text: '按钮1',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '按钮提示4',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮4',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            confirm: {
              placement: 'topRight',
              title: '将要进行操作，确定吗？',
              okText: '确定',
              cancelText: '取消',
            },
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
          component: renderSearchArticleRenderTypeSelect({
            global: this.getGlobal(),
          }),
        },
        {
          lg: 12,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardRangePickerCore(dateRangeFieldName),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchArticleStatusSelect({
            global: this.getGlobal(),
          }),
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
        component: buildRadioGroup({
          value: listViewMode,
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
              flag: '4',
              name: 'OtherView',
              availability: whetherNumber.no,
            },
          ],
          onChange: (e) => {
            const {
              target: { value: v },
            } = e;

            this.setState({
              listViewMode: v,
              showSelect: v === listViewConfig.viewMode.table,
            });
          },
        }),
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconCollection.sortAscending,
        text: '侧拉单页列表',
        handleClick: this.showSingleListDrawer,
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo.permission),
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconCollection.plus,
        text: '新增文章[侧拉]',
        handleClick: this.showAddBasicInfoDrawer,
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo.permission),
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconCollection.plus,
        text: '新增文章[页面]',
        handleClick: this.goToAdd,
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo.permission),
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
            icon: iconCollection.infoCircle,
            text: '一些说明',
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            icon: iconCollection.form,
            text: '一般按钮',
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            hidden: true,
            icon: iconCollection.form,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItemInner = (r, index) => {
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
      formatValue: (val) => {
        return getArticleRenderTypeName({
          global: this.getGlobal(),
          value: val,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (val) => {
        return {
          status: getStatusBadge(val),
          text: getArticleStatusName({
            global: this.getGlobal(),
            value: val,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.articleId,
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
      render: (text, r) => {
        const itemStatus = getValueByKey({
          data: r,
          key: fieldData.status.name,
          convert: convertCollection.number,
        });

        return buildDropdownButton({
          size: 'small',
          text: '编辑',
          icon: iconCollection.form,
          handleButtonClick: ({ handleData }) => {
            this.goToEdit(handleData);
          },
          handleData: r,
          handleMenuClick: ({ key, handleData }) => {
            this.handleMenuClick({ key, handleData });
          },
          items: [
            {
              key: 'showUpdateBasicInfoDrawer',
              withDivider: true,
              uponDivider: true,
              icon: iconCollection.edit,
              text: '编辑[侧拉]',
              hidden: !this.checkAuthority(accessWayCollection.article.updateBasicInfo.permission),
            },
            {
              key: 'setOnline',
              icon: iconCollection.playCircle,
              text: '设为上线',
              hidden: !this.checkAuthority(accessWayCollection.article.setOnline.permission),
              disabled: itemStatus === statusCollection.online,
              confirm: {
                title: '将要设置为上线，确定吗？',
              },
            },
            {
              key: 'setOffline',
              icon: iconCollection.pauseCircle,
              text: '设为下线',
              hidden: !this.checkAuthority(accessWayCollection.article.setOffline.permission),
              disabled: itemStatus === statusCollection.offline,
              confirm: {
                title: '将要设置为下线，确定吗？',
              },
            },
            {
              key: 'setSort',
              withDivider: true,
              uponDivider: true,
              icon: iconCollection.edit,
              text: '设置排序值',
              hidden: !this.checkAuthority(accessWayCollection.article.updateSort.permission),
            },
            {
              key: 'refreshCache',
              withDivider: true,
              uponDivider: true,
              icon: iconCollection.reload,
              text: '刷新缓存',
              hidden: !this.checkAuthority(accessWayCollection.article.refreshCache.permission),
              confirm: {
                title: '将要刷新缓存，确定吗？',
              },
            },
          ],
        });
      },
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '分页模式：单页数据默认会启用前台模拟分页，分页试图有助于解决长列表渲染情况下的页面卡顿情况。',
        },
        {
          text: '模式变更：如若不需要模拟分页展示，可以通过设置 this.useFrontendPagination = false 来关闭。',
        },
      ],
    };
  };

  renderOther = () => {
    const {
      articleId,
      singleListDrawerVisible,
      addBasicInfoDrawerVisible,
      updateBasicInfoDrawerVisible,
      changeSortModalVisible,
      currentRecord,
    } = this.state;

    const renderChangeSortModal = this.checkAuthority(
      accessWayCollection.article.updateSort.permission,
    );

    return (
      <>
        <SingleListDrawer
          width={1200}
          visible={singleListDrawerVisible}
          afterOK={() => {
            this.showSingleListDrawer();
          }}
          afterCancel={() => {
            this.afterSingleListDrawerCancel();
          }}
          afterClose={() => {
            this.afterSingleListDrawerClose();
          }}
        />

        <AddBasicInfoDrawer
          visible={addBasicInfoDrawerVisible}
          externalData={{ articleId }}
          afterOK={() => {
            this.afterAddBasicInfoDrawerOk();
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
}

export default SingleList;
