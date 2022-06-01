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
import {
  DownOutlined,
  EditOutlined,
  FormOutlined,
  InfoCircleFilled,
  PauseCircleTwoTone,
  PictureFilled,
  PlayCircleTwoTone,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Card, List, Table } from 'antd';
import {
  buildColorText,
  buildCustomGrid,
  buildRadioGroup,
  buildTagList,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';
import MultiPage from 'antd-management-fast-framework/es/framework/DataMultiPageView/MultiPage';
import { handleItem } from 'antd-management-fast-framework/es/utils/actionAssist';
import {
  cardConfig,
  columnFacadeMode,
  columnPlaceholder,
  convertCollection,
  extraBuildType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
  whetherNumber,
} from 'antd-management-fast-framework/es/utils/constants';
import {
  getRandomColor,
  getValueByKey,
  replaceTargetText,
  showInfoMessage,
} from 'antd-management-fast-framework/es/utils/tools';
import { connect } from 'umi';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import { refreshCacheAction, setOfflineAction, setOnlineAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import ChangeSortModal from '../ChangeSortModal';
import { fieldData, mediaItemData, statusCollection } from '../Common/data';
import ArticleSelectField from '../SelectField';
import UpdateBasicInfoDrawer from '../UpdateBasicInfoDrawer';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class PageList extends MultiPage {
  restoreSearch = true;

  // showSearchForm = false;

  //在控制台中显示渲染次数，仅用于调试
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
        tableScroll: { x: 1620 },
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
          icon: <InfoCircleFilled />,
          text: '一些说明',
        },
        {
          buildType: extraBuildType.button,
          icon: <FormOutlined />,
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
          type: searchCardConfig.contentItemType.inputNumber,
          fieldData: fieldData.sort,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        image: getValueByKey({
          data: r,
          key: fieldData.image.name,
        }),
        imageCircle: false,
        icon: <PictureFilled />,
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
            textFormat: (v) => {
              return replaceTargetText(v, '***', 2, 6);
            },
            tooltip: true,
            tooltipColor: '#cdbda0',
            ellipsis: true,
            // ellipsisMaxWidth: 180,
            onClick: () => {
              showInfoMessage({
                message: 'onClick',
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
      width: 620,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.image,
      width: 80,
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
      showRichFacade: true,
      facadeMode: columnFacadeMode.dropdown,
      configBuilder: (text, record) => {
        const itemStatus = getValueByKey({
          data: record,
          key: fieldData.status.name,
          convert: convertCollection.number,
        });

        return {
          size: 'small',
          text: '编辑',
          icon: <FormOutlined />,
          handleButtonClick: ({ handleData }) => {
            this.goToEdit(handleData);
          },
          handleData: record,
          confirm: {
            title: '将要进行编辑，确定吗？',
          },
          handleMenuClick: ({ key, handleData }) => {
            this.handleMenuClick({ key, handleData });
          },
          items: [
            {
              key: 'showUpdateBasicInfoDrawer',
              icon: <EditOutlined />,
              text: '编辑[侧拉]',
              hidden: !this.checkAuthority(accessWayCollection.article.updateBasicInfo.permission),
            },
            {
              key: 'setOnline',
              withDivider: true,
              uponDivider: true,
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
        };
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
              switcherIcon: <DownOutlined />,
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
              icon: <InfoCircleFilled />,
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
