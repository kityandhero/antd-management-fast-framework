import React from 'react';
import { connect } from 'umi';
import { Spin, List, Space, message } from 'antd';
import {
  FormOutlined,
  PlusOutlined,
  PlayCircleTwoTone,
  PauseCircleTwoTone,
  ConsoleSqlOutlined,
  ReloadOutlined,
  EditOutlined,
  InfoCircleFilled,
} from '@ant-design/icons';

import {
  toNumber,
  showInfoMessage,
  getValueByKey,
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
import SinglePage from 'antd-management-fast-framework/es/framework/DataSinglePageView/SinglePage';
import {
  buildRadioGroup,
  buildCustomGrid,
  buildDropdown,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';
import { colorCollection, priceColor } from '@/customConfig/constants';
import {
  getArticleRenderTypeName,
  renderSearchArticleRenderTypeSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleRenderType';
import {
  getArticleStatusName,
  renderSearchArticleStatusSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import ChangeSortModal from '../ChangeSortModal';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import UpdateBasicInfoDrawer from '../UpdateBasicInfoDrawer';
import { setOfflineAction, setOnlineAction, refreshCacheAction } from '../Assist/action';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class SingleList extends SinglePage {
  componentAuthority = accessWayCollection.article.singleList.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '文章单页列表',
        paramsKey: accessWayCollection.article.singleList.permission,
        loadApiPath: 'article/singleList',
        listViewMode: listViewConfig.viewMode.cardCollectionView,
        changeSortModalVisible: false,
        addBasicInfoDrawerVisible: false,
        updateBasicInfoDrawerVisible: false,
        currentRecord: null,
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

  getStatusBadge = (v) => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'processing';
        break;

      case 0:
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
        onClick: this.showAddBasicInfoDrawer,
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo.permission),
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: <PlusOutlined />,
        text: '新增文章[页面]',
        onClick: this.goToAdd,
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
            icon: <InfoCircleFilled />,
            text: '一些说明',
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

export default SingleList;
