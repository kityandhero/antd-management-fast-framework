import React, { Fragment } from 'react';
import { connect } from 'umi';
import { List, Space, Card, Table, Spin, Divider } from 'antd';
import {
  FormOutlined,
  PlusOutlined,
  PlayCircleTwoTone,
  PauseCircleTwoTone,
  ConsoleSqlOutlined,
  ReloadOutlined,
  EditOutlined,
  InfoCircleFilled,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  MinusCircleOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  RightSquareOutlined,
  BorderOuterOutlined,
  StopOutlined,
  AimOutlined,
  FieldNumberOutlined,
} from '@ant-design/icons';

import {
  toNumber,
  showInfoMessage,
  getValueByKey,
  isArray,
  getRandomColor,
  recordObject,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  unlimitedWithStringFlag,
  searchCardConfig,
  columnFacadeMode,
  columnPlaceholder,
  convertCollection,
  listViewConfig,
  cardConfig,
  whetherNumber,
} from 'antd-management-fast-framework/es/utils/constants';
import { handleItem } from 'antd-management-fast-framework/es/utils/actionAssist';
import MultiPage from 'antd-management-fast-framework/es/framework/DataMultiPageView/MultiPage';
import {
  buildRadioGroup,
  buildCustomGrid,
  buildDropdownButton,
  buildButton,
  buildDropdown,
  buildDropdownEllipsis,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

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

import ArticleSelectField from '../SelectField';
import ChangeSortModal from '../ChangeSortModal';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import UpdateBasicInfoDrawer from '../UpdateBasicInfoDrawer';
import { setOfflineAction, setOnlineAction, refreshCacheAction } from '../Assist/action';
import { fieldData, mediaItemData, statusCollection } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class PageList extends MultiPage {
  restoreSearch = true;

  showRenderCountInConsole = true;

  componentAuthority = accessWayCollection.article.pageList.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showSelect: true,
        pageName: '文章列表',
        paramsKey: accessWayCollection.article.pageList.paramsKey,
        listViewMode: listViewConfig.viewMode.table,
        pageSize: 8,
        // tableScroll: { x: 1720 },
        loadApiPath: 'article/pageList',
        changeSortModalVisible: false,
        addBasicInfoDrawerVisible: false,
        updateBasicInfoDrawerVisible: false,
        currentRecord: null,
        articleId: '',
        articleTitle: '',
      },
    };
  }

  getGlobal = () => {
    const { global } = this.props;

    return global || null;
  };

  getApiData = (props) => {
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

  showAddBasicInfoDrawer = () => {
    this.setState({
      addBasicInfoDrawerVisible: true,
    });
  };

  afterAddBasicInfoDrawerOk = () => {
    this.refreshData({ addBasicInfoDrawerVisible: false }, null, 300);
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
    this.refreshData({ updateBasicInfoDrawerVisible: false }, null, 300);
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

  afterArticleSelect = (d) => {
    const { articleId, title } = d;

    this.setState({
      articleId: articleId || '',
      articleTitle: title || '',
    });

    this.setSearchFormFieldsValue({
      articleId: articleId || '',
      articleTitle: title || '',
    });
  };

  afterArticleClearSelect = () => {
    this.setState({
      articleId: '',
      articleTitle: '',
    });

    this.setSearchFormFieldsValue({
      articleId: '',
      articleTitle: '',
    });
  };

  handleAdditionalSearchReset = () => {
    this.setState({
      articleId: '',
      articleTitle: '',
    });
  };

  getStatusBadge = (v) => {
    let result = 'default';

    switch (v) {
      case statusCollection.online:
        result = 'processing';
        break;

      case statusCollection.offline:
        result = 'warning';
        break;

      default:
        result = 'default';
        break;
    }

    return result;
  };

  goToAdd = () => {
    this.goToPath(`/news/article/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { articleId } = record;

    this.goToPath(`/news/article/edit/load/${articleId}/key/basicInfo`);
  };

  establishToolBarConfig = () => {
    const that = this;

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
    const { dataLoading, processing, loadSuccess, dateRangeFieldName, articleTitle } = this.state;

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
          component: (
            <>
              <ArticleSelectField
                dataLoading={dataLoading}
                processing={processing}
                loadSuccess={loadSuccess}
                label={fieldData.title.label}
                title={articleTitle || null}
                // helper={fieldData.title.helper}
                afterSelect={(d) => {
                  this.afterArticleSelect(d);
                }}
                afterClearSelect={() => {
                  this.afterArticleClearSelect();
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
          return o.mediaItemList.length > 0;
        });

        return result;
      },
      rowExpandable: (record) => record.mediaItemList.length > 0,
      expanderStyle: {
        boxShadow: '0 2px 12px 2px #aaa',
        borderRadius: '4px',
      },
      animalType: listViewConfig.expandAnimalType.queue,
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
          <Card>
            <Table
              // scroll={{ x: 1460 }}
              columns={columns}
              dataSource={record.mediaItemList}
              pagination={false}
            />
          </Card>
        );
      },
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
        icon: <PlusOutlined />,
        text: '新增文章[侧拉]',
        handleClick: this.showAddBasicInfoDrawer,
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo.permission),
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: <PlusOutlined />,
        confirm: {
          title: '即将跳转新增数据页面，确定吗？',
        },
        text: '新增文章[页面]',
        handleClick: this.goToAdd,
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo.permission),
      },
    ];
  };

  establishCardCollectionViewItemConfig = (r) => {
    return {
      title: {
        text: getValueByKey({
          data: r,
          key: fieldData.title.name,
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
            icon: <InfoCircleFilled />,
            text: '一些说明',
            canCopy: true,
          },
          {
            buildType: cardConfig.extraBuildType.iconInfo,
            icon: <InfoCircleFilled />,
            textPrefix: '复制',
            text: '自定义',
            canCopy: true,
            copyData: '要复制的文字',
          },
          {
            buildType: cardConfig.extraBuildType.iconInfo,
            icon: <InfoCircleFilled />,
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
            tooltip: true,
            ellipsis: true,
            ellipsisWidth: 180,
            onClick: () => {
              showInfoMessage({
                message: 'onClick',
              });
            },
          },
          {
            buildType: cardConfig.extraBuildType.colorText,
            textPrefix: '前缀',
            text: '后缀',
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            icon: <FormOutlined />,
            text: '一般按钮',
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            hidden: true,
            icon: <FormOutlined />,
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
      facadeConfigBuilder: (val) => {
        return {
          color: getRandomColor({
            seed: val,
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
          status: this.getStatusBadge(val),
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

        return buildDropdown({
          size: 'small',
          text: '编辑',
          icon: <FormOutlined />,
          handleButtonClick: ({ handleData }) => {
            this.goToEdit(handleData);
          },
          handleData: r,
          confirm: {
            title: '将要进行编辑，确定吗？',
          },
          handleMenuClick: ({ key, handleData }) => {
            this.handleMenuClick({ key, handleData });
          },
          menuItems: [
            {
              key: 'showUpdateBasicInfoDrawer',
              withDivider: true,
              uponDivider: true,
              icon: <EditOutlined />,
              text: '编辑[侧拉]',
              hidden: !this.checkAuthority(accessWayCollection.article.updateBasicInfo.permission),
            },
            {
              key: 'setOnline',
              icon: <PlayCircleTwoTone twoToneColor={colorCollection.closeCircleColor} />,
              text: '设为上线',
              hidden: !this.checkAuthority(accessWayCollection.article.setOnline.permission),
              disabled: itemStatus === statusCollection.online,
              confirm: {
                title: '将要设置为上线，确定吗？',
              },
            },
            {
              key: 'setOffline',
              icon: <PauseCircleTwoTone twoToneColor={colorCollection.closeCircleColor} />,
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
              icon: <EditOutlined />,
              text: '设置排序值',
              hidden: !this.checkAuthority(accessWayCollection.article.updateSort.permission),
            },
            {
              key: 'refreshCache',
              withDivider: true,
              uponDivider: true,
              icon: <ReloadOutlined />,
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
          text: '简要说明：这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明：这里可以显示需要提示的信息。',
        },
      ],
    };
  };

  renderOther = () => {
    const {
      articleId,
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

export default PageList;
