import React from 'react';
import { connect } from 'umi';
import { Button, List, Dropdown, Menu, message } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  InsertRowBelowOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  toDatetime,
  formatDatetime,
  isArray,
  getValueByKey,
  toString,
  sortCollectionByKey,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  defaultEmptyImage,
  cardConfig,
  datetimeFormat,
  convertCollection,
  formatCollection,
  sortOperate,
} from 'antd-management-fast-framework/es/utils/constants';
import ColorText from 'antd-management-fast-framework/es/customComponents/ColorText';
import StatusBar from 'antd-management-fast-framework/es/customComponents/StatusBar';
import IconInfo from 'antd-management-fast-framework/es/customComponents/IconInfo';
import FlexBox from 'antd-management-fast-framework/es/customComponents/FlexBox';
import { buildDropdownButton } from 'antd-management-fast-framework/es/customComponents/FunctionComponent';
import {
  buildListViewItemExtra,
  buildDescriptionGrid,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';

import AddMediaItemDrawer from '../../AddMediaItemDrawer';
import UpdateMediaItemDrawer from '../../UpdateMediaItemDrawer';
import MediaItemPreviewDrawer from '../../MediaItemPreviewDrawer';
import TabPageBase from '../../TabPageBase';
import { setMediaCollectionSortAction, removeMediaItemAction } from '../../Assist/action';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { mediaItemData } from '../../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.article.get.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/get',
        articleId: null,
        mediaItemList: [],
        mediaItemCount: 0,
        addMediaItemDrawerVisible: false,
        updateMediaItemDrawerVisible: false,
        mediaItemPreviewDrawerVisible: false,
        currentMediaItem: null,
        selectForwardId: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fillInitialValuesAfterLoad = (metaData, metaListData, metaExtra, metaOriginalData) => null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    this.setCustomData(metaData);
  };

  setCustomData = (metaData) => {
    const { mediaItemList: mediaItemSourceList } = metaData;

    const mediaItemList = [];

    (mediaItemSourceList || []).forEach((item) => {
      const o = {
        ...item,
        ...{
          key: item.id,
          sort: item.sort + 1,
        },
      };

      mediaItemList.push(o);
    });

    this.setState({
      metaData,
      mediaItemList,
      mediaItemCount: mediaItemList.length,
    });
  };

  showMediaItemPreviewDrawer = () => {
    this.setState({
      mediaItemPreviewDrawerVisible: true,
    });
  };

  closeMediaItemPreviewDrawer = () => {
    this.setState({
      mediaItemPreviewDrawerVisible: false,
    });
  };

  showInsertMediaItemDrawer = (record) => {
    this.setState({
      addMediaItemDrawerVisible: true,
      selectForwardId: getValueByKey({
        data: record,
        key: mediaItemData.id.name,
      }),
    });
  };

  showAddMediaItemDrawer = () => {
    this.setState({
      addMediaItemDrawerVisible: true,
      selectForwardId: '',
    });
  };

  showUpdateMediaItemDrawer = (record) => {
    this.setState({
      updateMediaItemDrawerVisible: true,
      selectForwardId: '',
      currentMediaItem: record,
    });
  };

  afterAddMediaItemDrawerOk = () => {
    this.setState({
      addMediaItemDrawerVisible: false,
      selectForwardId: '',
    });

    this.refreshData();
  };

  afterUpdateMediaItemDrawerOk = () => {
    this.setState(
      {
        updateMediaItemDrawerVisible: false,
      },
      () => {
        const that = this;

        setTimeout(() => {
          that.refreshData();
        }, 300);
      },
    );
  };

  afterAddMediaItemDrawerCancel = () => {
    this.setState({
      addMediaItemDrawerVisible: false,
      selectForwardId: '',
    });
  };

  afterUpdateMediaItemDrawerCancel = () => {
    this.setState({ updateMediaItemDrawerVisible: false });
  };

  afterAddMediaItemDrawerClose = () => {
    this.setState({
      addMediaItemDrawerVisible: false,
      selectForwardId: '',
    });
  };

  afterUpdateMediaItemDrawerClose = () => {
    this.setState({ updateMediaItemDrawerVisible: false });
  };

  handleMenuClick = ({ key, handleData }) => {
    const { articleId } = this.state;

    switch (key) {
      case 'insertItem':
        this.showInsertMediaItemDrawer(handleData);
        break;

      case sortOperate.moveUp:
        this.changeSort(key, handleData);
        break;

      case sortOperate.moveDown:
        this.changeSort(key, handleData);
        break;

      case 'removeItem':
        removeMediaItemAction({
          target: this,
          handleData: { ...(handleData || {}), ...{ articleId } },
          successCallback: ({ target, remoteData }) => {
            target.setCustomData(remoteData);
          },
        });
        break;

      default:
        break;
    }
  };

  changeSort = (key, record) => {
    const { mediaItemList } = this.state;

    const list = sortCollectionByKey({
      operate: key,
      item: record,
      list: mediaItemList,
      sortKey: 'sort',
      sortMin: 1,
    });

    this.saveSortChangedMediaItem(list);
  };

  saveSortChangedMediaItem = (mediaItems) => {
    const { articleId } = this.state;

    this.setState({ mediaItemList: mediaItems }, () => {
      const ids = (isArray(mediaItems) ? mediaItems : [])
        .map((o) => {
          const v = getValueByKey({
            data: o,
            key: mediaItemData.id.name,
          });

          return v;
        })
        .join();

      setMediaCollectionSortAction({
        target: this,
        handleData: {
          articleId,
          ids,
        },
      });
    });
  };

  renderListView = (list) => {
    return (
      <List
        itemLayout="vertical"
        size="small"
        dataSource={list}
        renderItem={(item, index) => {
          return this.renderListViewItem(item, index);
        }}
      />
    );
  };

  renderListViewItem = (record, index) => {
    return <List.Item>{this.renderListViewItemInner(record, index)}</List.Item>;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItemInner = (r, index) => {
    const { mediaItemList } = this.state;

    const title = getValueByKey({
      data: r,
      key: mediaItemData.title.name,
      defaultValue: '无标题',
    });

    const image = getValueByKey({
      data: r,
      key: mediaItemData.image.name,
    });

    const description = getValueByKey({
      data: r,
      key: mediaItemData.description.name,
      defaultValue: '无描述',
    });

    const link = getValueByKey({
      data: r,
      key: mediaItemData.link.name,
      defaultValue: '未设置',
    });

    const video = getValueByKey({
      data: r,
      key: mediaItemData.video.name,
      defaultValue: '未设置',
    });

    const sort = getValueByKey({
      data: r,
      key: mediaItemData.sort.name,
      convert: convertCollection.number,
    });

    const createTime = getValueByKey({
      data: r,
      key: mediaItemData.createTime.name,
      format: formatCollection.datetime,
    });

    return (
      <>
        <List.Item.Meta
          title={<ColorText textPrefix={mediaItemData.title.label} text={title} />}
          description={
            <FlexBox
              flexAuto="right"
              left={buildListViewItemExtra({
                index,
                align: 'top',
                imageUrl: image,
                emptyImageUrl: defaultEmptyImage,
              })}
              right={
                <div
                  style={{
                    paddingLeft: '20px',
                  }}
                >
                  {buildDescriptionGrid({
                    list: [
                      {
                        label: mediaItemData.description.label,
                        value: description,
                      },
                      {
                        label: mediaItemData.link.label,
                        value: link,
                      },
                      {
                        label: mediaItemData.video.label,
                        value: video,
                      },
                    ],
                    props: {
                      bordered: false,
                      column: 1,
                      labelStyle: {
                        width: '42px',
                      },
                      contentStyle: {
                        color: '#999',
                      },
                    },
                  })}
                </div>
              }
            />
          }
        />
        <div>
          <StatusBar
            actions={[
              <IconInfo
                textPrefix={mediaItemData.id.label}
                text={getValueByKey({
                  data: r,
                  key: mediaItemData.id.name,
                })}
                canCopy
              />,
              <IconInfo textPrefix={mediaItemData.sort.label} text={toString(sort)} />,
              <IconInfo
                textPrefix={mediaItemData.createTime.label}
                textPrefix={mediaItemData.createTime.label}
                textPrefix={mediaItemData.createTime.label}
                text={createTime}
              />,
            ]}
            extra={buildDropdownButton({
              size: 'small',
              text: '编辑',
              icon: <EditOutlined />,
              handleButtonClick: ({ handleData }) => {
                this.showUpdateMediaItemDrawer(handleData);
              },
              handleData: r,
              handleMenuClick: ({ key, handleData }) => {
                this.handleMenuClick({ key, handleData });
              },
              menuItems: [
                {
                  key: 'insertItem',
                  icon: <InsertRowBelowOutlined />,
                  text: '在下方插入',
                  hidden: !this.checkAuthority(accessWayCollection.article.addMediaItem.permission),
                },
                {
                  key: sortOperate.moveUp,
                  withDivider: true,
                  uponDivider: true,
                  icon: <ArrowUpOutlined />,
                  text: '向上移动',
                  hidden: !this.checkAuthority(accessWayCollection.article.updateSort.permission),
                  disabled: sort === 1,
                },
                {
                  key: sortOperate.moveDown,
                  icon: <ArrowDownOutlined />,
                  text: '向下移动',
                  hidden: !this.checkAuthority(accessWayCollection.article.updateSort.permission),
                  disabled: sort === (mediaItemList || []).length,
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
                {
                  key: 'removeItem',
                  withDivider: true,
                  uponDivider: true,
                  icon: <DeleteOutlined />,
                  text: '删除信息',
                  hidden: !this.checkAuthority(
                    accessWayCollection.article.removeMediaItem.permission,
                  ),
                  confirm: {
                    title: '将要删除信息，确定吗？',
                  },
                },
              ],
            })}
          />
        </div>
      </>
    );
  };

  establishToolBarConfig = () => {
    const { dataLoading, loadSuccess, mediaItemCount } = this.state;

    return {
      stick: true,
      tools: [
        {
          title: '当前信息总数',
          component: (
            <>
              <span>当前信息总数：{mediaItemCount}</span>
            </>
          ),
        },
        {
          title: '新增图文媒体',
          component: (
            <Button
              type="primary"
              disabled={
                !this.checkAuthority(accessWayCollection.article.addMediaItem.permission) ||
                dataLoading ||
                !loadSuccess
              }
              onClick={(e) => {
                this.showAddMediaItemDrawer(e);
              }}
            >
              <PlusCircleOutlined />
              新增媒体
            </Button>
          ),
        },
        {
          title: '预览图文',
          component: (
            <Button
              disabled={this.checkLoadingProgress()}
              onClick={() => {
                this.showMediaItemPreviewDrawer();
              }}
            >
              <EyeOutlined />
              预览
            </Button>
          ),
        },
        {
          title: '刷新数据',
          component: this.renderRefreshButton(),
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text:
            '若商品确定以后绝不会出现不同规格，可以使用创建商品时候自动生成的默认规格；若商品存在不同规格的可能性，则应该在商品建立之后，继续建立相关的规格名、规格值，然后创建指定规格的商品；这样之后，再次新增规格操作将会比较简单。',
        },
        {
          text: '已存在订单得规格项不能删除。',
        },
        {
          text: '默认规格在新增自定义规格后将被禁用并隐藏。',
        },
        {
          text:
            '新人专享设置针对的是商品的某个特定规格，一旦设置不可取消（取消会带来意料之外的问题，故此禁止取消），新人专享商品禁止加入购物车（可加入购物车会带来某些意想不到的后果）。',
        },
        {
          text: '新用户专享商品不可使用优惠券。',
        },
        {
          text:
            '限时售卖针对的是商品层次，对商品下的所有规格同时生效，限时售卖商品禁止加入购物车（可加入购物车会带来某些意想不到的后果）。',
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { processing, dataLoading, mediaItemList } = this.state;

    return {
      list: [
        {
          title: {
            text: '图片媒体列表',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: this.renderListView(mediaItemList),
            },
          ],
        },
      ],
    };
  };

  renderOther = () => {
    const {
      articleId,
      mediaItemList,
      currentMediaItem,
      addMediaItemDrawerVisible,
      updateMediaItemDrawerVisible,
      mediaItemPreviewDrawerVisible,
      selectForwardId,
    } = this.state;

    return (
      <>
        <AddMediaItemDrawer
          visible={addMediaItemDrawerVisible}
          externalData={{
            articleId,
            forwardId: selectForwardId,
          }}
          afterOK={() => {
            this.afterAddMediaItemDrawerOk();
          }}
          afterCancel={() => {
            this.afterAddMediaItemDrawerCancel();
          }}
          afterClose={() => {
            this.afterAddMediaItemDrawerClose();
          }}
        />

        <UpdateMediaItemDrawer
          visible={updateMediaItemDrawerVisible}
          externalData={{ ...(currentMediaItem || {}), ...{ articleId } }}
          afterOK={() => {
            this.afterUpdateMediaItemDrawerOk();
          }}
          afterCancel={() => {
            this.afterUpdateMediaItemDrawerCancel();
          }}
          afterClose={() => {
            this.afterUpdateMediaItemDrawerClose();
          }}
        />

        <MediaItemPreviewDrawer
          visible={mediaItemPreviewDrawerVisible}
          data={mediaItemList || []}
          afterClose={() => {
            this.closeMediaItemPreviewDrawer();
          }}
        />
      </>
    );
  };
}

export default BasicInfo;
