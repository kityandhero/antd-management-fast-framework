import { Button, List, Space } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  formatCollection,
  getValueByKey,
  isArray,
  sortCollectionByKey,
  sortOperate,
} from 'easy-soft-utility';

import {
  cardConfig,
  defaultEmptyImage,
  getDerivedStateFromPropertiesForUrlParameters,
  mobileTypeCollection,
} from 'antd-management-fast-common';
import {
  buildCustomGrid,
  buildDropdownButton,
  buildIconInfoList,
  buildListViewItemExtra,
  FlexBox,
  iconBuilder,
  StatusBar,
} from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import AddMediaItemDrawer from '../../AddMediaItemDrawer';
import {
  removeMediaItemAction,
  setMediaCollectionSortAction,
} from '../../Assist/action';
import { parseUrlParametersForSetState as parseUrlParametersForSetState } from '../../Assist/config';
import { mediaItemData } from '../../Common/data';
import MediaItemPreviewDrawer from '../../MediaItemPreviewDrawer';
import MobilePreviewBox from '../../MobilePreviewBox';
import TabPageBase from '../../TabPageBase';
import UpdateMediaItemDrawer from '../../UpdateMediaItemDrawer';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.simple.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'simple/get',
      simpleId: null,
      mediaItemList: [],
      mediaItemCount: 0,
      currentMediaItem: null,
      selectForwardId: '',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  fillInitialValuesAfterLoad = (
    // eslint-disable-next-line no-unused-vars
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  ) => null;

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    this.setCustomData(metaData);
  };

  setCustomData = (metaData) => {
    const { mediaItemList: mediaItemSourceList } = metaData;

    const mediaItemList = [];

    for (const item of mediaItemSourceList || []) {
      const o = {
        ...item,

        key: item.id,
        sort: item.sort + 1,
      };

      mediaItemList.push(o);
    }

    this.setState({
      metaData,
      mediaItemList,
      mediaItemCount: mediaItemList.length,
    });
  };

  showMediaItemPreviewDrawer = () => {
    MediaItemPreviewDrawer.open();
  };

  showInsertMediaItemDrawer = (record) => {
    this.setState({
      selectForwardId: getValueByKey({
        data: record,
        key: mediaItemData.id.name,
      }),
    });
  };

  showAddMediaItemDrawer = () => {
    this.setState(
      {
        selectForwardId: '',
      },
      () => {
        AddMediaItemDrawer.open();
      },
    );
  };

  showUpdateMediaItemDrawer = (record) => {
    this.setState(
      {
        selectForwardId: '',
        currentMediaItem: record,
      },
      () => {
        UpdateMediaItemDrawer.open();
      },
    );
  };

  afterAddMediaItemDrawerOk = () => {
    this.setState({
      selectForwardId: '',
    });

    this.refreshData({});
  };

  afterUpdateMediaItemDrawerOk = () => {
    this.refreshData({ delay: 300 });
  };

  afterAddMediaItemDrawerCancel = () => {
    this.setState({
      selectForwardId: '',
    });
  };

  afterAddMediaItemDrawerClose = () => {
    this.setState({
      selectForwardId: '',
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    const { simpleId } = this.state;

    switch (key) {
      case 'insertItem': {
        this.showInsertMediaItemDrawer(handleData);
        break;
      }

      case sortOperate.moveUp: {
        this.changeSort(key, handleData);
        break;
      }

      case sortOperate.moveDown: {
        this.changeSort(key, handleData);
        break;
      }

      case 'removeItem': {
        removeMediaItemAction({
          target: this,
          handleData: { ...handleData, simpleId },
          successCallback: ({ target, remoteData }) => {
            target.setCustomData(remoteData);
          },
        });
        break;
      }

      default: {
        break;
      }
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
    const { simpleId } = this.state;

    this.setState({ mediaItemList: mediaItems }, () => {
      const ids = (isArray(mediaItems) ? mediaItems : [])
        .map((o) => {
          const v = getValueByKey({
            data: o,
            key: mediaItemData.id.name,
          });

          return v;
        })
        .join(',');

      setMediaCollectionSortAction({
        target: this,
        handleData: {
          simpleId,
          ids,
        },
      });
    });
  };

  renderPresetListView = (list) => {
    return (
      <List
        itemLayout="vertical"
        size="small"
        dataSource={list}
        renderItem={(item, index) => {
          return this.renderPresetListViewItem(item, index);
        }}
      />
    );
  };

  renderPresetListViewItem = (record, index) => {
    return (
      <List.Item>{this.renderPresetListViewItemInner(record, index)}</List.Item>
    );
  };

  renderPresetListViewItemInner = (record, index) => {
    const { mediaItemList } = this.state;

    const mediaItemId = getValueByKey({
      data: record,
      key: mediaItemData.id.name,
    });

    const title = getValueByKey({
      data: record,
      key: mediaItemData.title.name,
    });

    const description = getValueByKey({
      data: record,
      key: mediaItemData.description.name,
    });

    const image = getValueByKey({
      data: record,
      key: mediaItemData.image.name,
    });

    const link = getValueByKey({
      data: record,
      key: mediaItemData.link.name,
    });

    const video = getValueByKey({
      data: record,
      key: mediaItemData.video.name,
    });

    const audio = getValueByKey({
      data: record,
      key: mediaItemData.audio.name,
    });

    const attachment = getValueByKey({
      data: record,
      key: mediaItemData.attachment.name,
    });

    const sort = getValueByKey({
      data: record,
      key: mediaItemData.sort.name,
      convert: convertCollection.number,
    });

    const createTime = getValueByKey({
      data: record,
      key: mediaItemData.createTime.name,
      format: formatCollection.datetime,
    });

    const grid = buildCustomGrid({
      list: [
        {
          label: mediaItemData.mediaType.label,
          value: title,
        },
        {
          label: mediaItemData.image.label,
          value: image,
          hidden: checkStringIsNullOrWhiteSpace(image),
        },
        {
          label: mediaItemData.description.label,
          value: description,
          hidden: checkStringIsNullOrWhiteSpace(description),
        },
        {
          label: mediaItemData.link.label,
          value: link,
          hidden: checkStringIsNullOrWhiteSpace(link),
        },
        {
          label: mediaItemData.video.label,
          value: video,
          hidden: checkStringIsNullOrWhiteSpace(video),
        },
        {
          label: mediaItemData.audio.label,
          value: audio,
          hidden: checkStringIsNullOrWhiteSpace(audio),
        },
        {
          label: mediaItemData.attachment.label,
          value: attachment,
          hidden: checkStringIsNullOrWhiteSpace(attachment),
        },
      ],
      props: {
        bordered: true,
        column: 1,
        size: 'small',
        labelStyle: {
          width: '80px',
        },
        emptyValue: '暂无',
        emptyStyle: {
          color: '#ccc',
        },
      },
    });

    return (
      <>
        <Space direction="vertical" style={{ width: '100%' }}>
          {checkStringIsNullOrWhiteSpace(image) ? (
            grid
          ) : (
            <FlexBox
              flexAuto="right"
              left={
                checkStringIsNullOrWhiteSpace(image)
                  ? null
                  : buildListViewItemExtra({
                      index,
                      align: 'top',
                      imageUrl: getValueByKey({
                        data: record,
                        key: mediaItemData.image.name,
                      }),
                      emptyImageUrl: defaultEmptyImage,
                      width: '80px',
                    })
              }
              right={
                <div
                  style={{
                    paddingLeft: '20px',
                  }}
                >
                  {grid}
                </div>
              }
            />
          )}

          <StatusBar
            actions={buildIconInfoList({
              list: [
                {
                  textPrefix: mediaItemData.id.label,
                  text: mediaItemId,
                  canCopy: true,
                },
                {
                  textPrefix: mediaItemData.sort.label,
                  text: toString(sort),
                },
                {
                  textPrefix: mediaItemData.createTime.label,
                  text: createTime,
                },
              ],
            })}
            extra={buildDropdownButton({
              size: 'small',
              text: '编辑',
              icon: iconBuilder.edit(),
              handleButtonClick: ({ handleData }) => {
                this.showUpdateMediaItemDrawer(handleData);
              },
              handleData: record,
              handleMenuClick: ({ key, handleData }) => {
                this.handleMenuClick({ key, handleData });
              },
              items: [
                {
                  key: 'insertItem',
                  icon: iconBuilder.insertRowBelow(),
                  text: '在下方插入',
                  hidden: !checkHasAuthority(
                    accessWayCollection.simple.addMediaItem.permission,
                  ),
                },
                {
                  key: 'moveUp',
                  withDivider: true,
                  uponDivider: true,
                  icon: iconBuilder.arrowUp(),
                  text: '向上移动',
                  hidden: !checkHasAuthority(
                    accessWayCollection.simple.updateSort.permission,
                  ),
                  disabled: sort === 1,
                },
                {
                  key: 'moveDown',
                  icon: iconBuilder.arrowDown(),
                  text: '向下移动',
                  hidden: !checkHasAuthority(
                    accessWayCollection.simple.updateSort.permission,
                  ),
                  disabled: sort === (mediaItemList || []).length,
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
                {
                  key: 'removeItem',
                  withDivider: true,
                  uponDivider: true,
                  icon: iconBuilder.delete(),
                  text: '删除信息',
                  hidden: !checkHasAuthority(
                    accessWayCollection.simple.removeMediaItem.permission,
                  ),
                  confirm: true,
                  title: '将要删除信息，确定吗？',
                },
              ],
            })}
          />
        </Space>
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
              <span>当前信息总数:{mediaItemCount}</span>
            </>
          ),
        },
        {
          title: '新增图文媒体',
          component: (
            <Button
              type="primary"
              disabled={
                !checkHasAuthority(
                  accessWayCollection.simple.addMediaItem.permission,
                ) ||
                dataLoading ||
                !loadSuccess
              }
              onClick={(event) => {
                this.showAddMediaItemDrawer(event);
              }}
            >
              {iconBuilder.plusCircle()}
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
              {iconBuilder.eye()} 预览
            </Button>
          ),
        },
        {
          title: '刷新数据',
          component: this.renderPresetRefreshButton(),
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '文章的构建将依照媒体顺序进行。',
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { mediaItemList } = this.state;

    const spinning = this.checkInProgress();

    return {
      list: [
        {
          title: {
            text: '图片媒体列表',
          },
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: this.renderPresetListView(mediaItemList),
            },
          ],
        },
      ],
    };
  };

  establishPageContentLayoutSiderConfig = () => {
    return { width: 400 };
  };

  renderPresetSiderTopArea = () => {
    const { mediaItemList } = this.state;

    return (
      <MobilePreviewBox
        affix
        affixOffsetTop={20}
        mobileList={[
          mobileTypeCollection.roughSketch,
          mobileTypeCollection.iPhone5S,
        ]}
        data={mediaItemList || []}
      />
    );
  };

  renderPresetOther = () => {
    const { simpleId, mediaItemList, currentMediaItem, selectForwardId } =
      this.state;

    return (
      <>
        <AddMediaItemDrawer
          externalData={{
            simpleId,
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
          externalData={{ ...currentMediaItem, simpleId }}
          afterOK={() => {
            this.afterUpdateMediaItemDrawerOk();
          }}
        />

        <MediaItemPreviewDrawer data={mediaItemList || []} />
      </>
    );
  };
}

export default BasicInfo;
