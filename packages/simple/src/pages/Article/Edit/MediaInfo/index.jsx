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
} from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  getPathValue,
  toDatetime,
  formatDatetime,
  isArray,
} from 'antd-management-fast-framework/lib/utils/tools';
import {
  defaultEmptyImage,
  formContentConfig,
  datetimeFormat,
} from 'antd-management-fast-framework/lib/utils/constants';
import ColorText from 'antd-management-fast-framework/lib/customComponents/ColorText';
import StatusBar from 'antd-management-fast-framework/lib/customComponents/StatusBar';
import IconInfo from 'antd-management-fast-framework/lib/customComponents/IconInfo';
import FlexBox from 'antd-management-fast-framework/lib/customComponents/FlexBox';
import {
  buildListViewItemExtra,
  buildDescriptionGrid,
} from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';

import AddMediaItemDrawer from '../../AddMediaItemDrawer';
import UpdateMediaItemDrawer from '../../UpdateMediaItemDrawer';
import MediaItemPreviewDrawer from '../../MediaItemPreviewDrawer';
import TabPageBase from '../../TabPageBase';
import { setMediaCollectionSortAction, removeMediaItemConfirmAction } from '../../Assist/action';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { mediaItemData } from '../../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.article.get;

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
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => null;

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
      selectForwardId: getPathValue(record, mediaItemData.id.name),
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

  handleMenuClick = (e, record) => {
    const { articleId } = this.state;
    const { key } = e;

    switch (key) {
      case 'insertItem':
        this.showInsertMediaItemDrawer(record);
        break;

      case 'moveUp':
        this.changeSort(key, record);
        break;

      case 'moveDown':
        this.changeSort(key, record);
        break;

      case 'removeItem':
        removeMediaItemConfirmAction({
          target: this,
          record: { ...(record || {}), ...{ articleId } },
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

    const beforeList = [];
    const afterList = [];
    let result = [];

    if ((mediaItemList || []).length <= 1) {
      message.warn('无需排序!');

      return;
    }

    (mediaItemList || []).forEach((item) => {
      if (item.sort < record.sort) {
        beforeList.push(item);
      }

      if (item.sort > record.sort) {
        afterList.push(item);
      }
    });

    switch (key) {
      case 'moveUp':
        if (record.sort === 1) {
          message.warn('已经排在第一了!');
          return;
        }

        (beforeList || []).forEach((item, index) => {
          if (index < beforeList.length - 1) {
            result.push(item);
          } else {
            const o1 = record;
            o1.sort -= 1;

            result.push(o1);

            const o2 = item;
            o2.sort += 1;

            result.push(o2);
          }
        });

        result = result.concat(afterList);

        this.saveSortChangedMediaItem(result);

        break;
      case 'moveDown':
        if (record.sort === (mediaItemList || []).length) {
          message.warn('已经排在最后了!');
        }

        result = result.concat(beforeList);

        (afterList || []).forEach((item, index) => {
          if (index === 0) {
            const o2 = item;
            o2.sort -= 1;

            result.push(o2);

            const o1 = record;
            o1.sort += 1;

            result.push(o1);
          } else {
            result.push(item);
          }
        });

        this.saveSortChangedMediaItem(result);

        break;
      default:
        break;
    }
  };

  saveSortChangedMediaItem = (mediaItems) => {
    const { articleId } = this.state;

    this.setState({ mediaItemList: mediaItems }, () => {
      const ids = (isArray(mediaItems) ? mediaItems : [])
        .map((o) => {
          const v = getPathValue(o, mediaItemData.id.name, '') || '';

          return v;
        })
        .join();

      setMediaCollectionSortAction(this, {
        articleId,
        ids,
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
  renderListViewItemInner = (record, index) => {
    const { mediaItemList } = this.state;

    return (
      <>
        <List.Item.Meta
          title={
            <ColorText
              textPrefix={mediaItemData.title.label}
              text={getPathValue(record, mediaItemData.title.name, '无标题') || '无标题'}
            />
          }
          description={
            <FlexBox
              flexAuto="right"
              left={buildListViewItemExtra({
                index,
                align: 'top',
                imageUrl: getPathValue(record, mediaItemData.image.name),
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
                        value:
                          getPathValue(record, mediaItemData.description.name, '无描述') ||
                          '无描述',
                      },
                      {
                        label: mediaItemData.link.label,
                        value: getPathValue(record, mediaItemData.link.name, '无描述') || '无描述',
                      },
                      {
                        label: mediaItemData.video.label,
                        value: getPathValue(record, mediaItemData.video.name, '无描述') || '无描述',
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
                text={getPathValue(record, mediaItemData.id.name)}
                canCopy
              />,
              <IconInfo
                textPrefix={mediaItemData.sort.label}
                text={getPathValue(record, mediaItemData.sort.name)}
              />,
              <IconInfo
                textPrefix={mediaItemData.createTime.label}
                text={formatDatetime(
                  toDatetime(getPathValue(record, mediaItemData.createTime.name)),
                  datetimeFormat.monthDayHourMinuteSecond,
                )}
              />,
            ]}
            extra={
              <Dropdown.Button
                size="small"
                placement="topRight"
                onClick={() => this.showUpdateMediaItemDrawer(record)}
                overlay={
                  <Menu onClick={(e) => this.handleMenuClick(e, record)}>
                    {this.checkAuthority(accessWayCollection.article.addMediaItem) ? (
                      <Menu.Item key="insertItem">
                        <IconInfo icon={<InsertRowBelowOutlined />} text="在下方插入" />
                      </Menu.Item>
                    ) : null}

                    {this.checkAuthority(accessWayCollection.article.addMediaItem) ? (
                      <Menu.Divider />
                    ) : null}

                    {this.checkAuthority(accessWayCollection.article.updateSort) ? (
                      <Menu.Item key="moveUp" disabled={record.sort === 1}>
                        <IconInfo icon={<ArrowUpOutlined />} text="向上移动" />
                      </Menu.Item>
                    ) : null}

                    {this.checkAuthority(accessWayCollection.article.updateSort) ? (
                      <Menu.Item
                        key="moveDown"
                        disabled={record.sort === (mediaItemList || []).length}
                      >
                        <IconInfo icon={<ArrowDownOutlined />} text="向下移动" />
                      </Menu.Item>
                    ) : null}

                    {this.checkAuthority(accessWayCollection.article.updateSort) ? (
                      <Menu.Divider />
                    ) : null}

                    {this.checkAuthority(accessWayCollection.article.removeMediaItem) ? (
                      <Menu.Item key="removeItem">
                        <IconInfo icon={<DeleteOutlined />} text="删除信息" />
                      </Menu.Item>
                    ) : null}
                  </Menu>
                }
              >
                <IconInfo icon={<EditOutlined />} text="修改" />
              </Dropdown.Button>
            }
          />
        </div>
      </>
    );
  };

  buildFormContentToolBarConfig = () => {
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
                !this.checkAuthority(accessWayCollection.article.addMediaItem) ||
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
              disabled={dataLoading || !loadSuccess}
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

  buildFormContentHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '若商品确定以后绝不会出现不同规格，可以使用创建商品时候自动生成的默认规格；若商品存在不同规格的可能性，则应该在商品建立之后，继续建立相关的规格名、规格值，然后创建指定规格的商品；这样之后，再次新增规格操作将会比较简单。',
        },
        {
          text: '已存在订单得规格项不能删除。',
        },
        {
          text: '默认规格在新增自定义规格后将被禁用并隐藏。',
        },
        {
          text: '新人专享设置针对的是商品的某个特定规格，一旦设置不可取消（取消会带来意料之外的问题，故此禁止取消），新人专享商品禁止加入购物车（可加入购物车会带来某些意想不到的后果）。',
        },
        {
          text: '新用户专享商品不可使用优惠券。',
        },
        {
          text: '限时售卖针对的是商品层次，对商品下的所有规格同时生效，限时售卖商品禁止加入购物车（可加入购物车会带来某些意想不到的后果）。',
        },
      ],
    };
  };

  formContentConfigData = () => {
    const { processing, dataLoading, mediaItemList } = this.state;

    return {
      list: [
        {
          title: {
            text: '图片媒体列表',
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.component,
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
