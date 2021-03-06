import { Button, List, Space } from 'antd';
import { connect } from 'umi';

import FlexBox from 'antd-management-fast-framework/es/customComponents/FlexBox';
import {
  buildCustomGrid,
  buildDropdownButton,
  buildIconInfoList,
  buildListViewItemExtra,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';
import StatusBar from 'antd-management-fast-framework/es/customComponents/StatusBar';
import {
  cardConfig,
  convertCollection,
  defaultEmptyImage,
  formatCollection,
  iconCollection,
  mobileTypeCollection,
  sortOperate,
} from 'antd-management-fast-framework/es/utils/constants';
import {
  getDerivedStateFromPropsForUrlParams,
  getValueByKey,
  isArray,
  sortCollectionByKey,
  stringIsNullOrWhiteSpace,
  toString,
} from 'antd-management-fast-framework/es/utils/tools';

import { accessWayCollection } from '@/customConfig/config';

import AddMediaItemDrawer from '../../AddMediaItemDrawer';
import { removeMediaItemAction, setMediaCollectionSortAction } from '../../Assist/action';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { mediaItemData } from '../../Common/data';
import MediaItemPreviewDrawer from '../../MediaItemPreviewDrawer';
import MobilePreviewBox from '../../MobilePreviewBox';
import TabPageBase from '../../TabPageBase';
import UpdateMediaItemDrawer from '../../UpdateMediaItemDrawer';

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

  renderListViewItemInner = (record, index) => {
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
          hidden: stringIsNullOrWhiteSpace(image),
        },
        {
          label: mediaItemData.description.label,
          value: description,
          hidden: stringIsNullOrWhiteSpace(description),
        },
        {
          label: mediaItemData.link.label,
          value: link,
          hidden: stringIsNullOrWhiteSpace(link),
        },
        {
          label: mediaItemData.video.label,
          value: video,
          hidden: stringIsNullOrWhiteSpace(video),
        },
        {
          label: mediaItemData.audio.label,
          value: audio,
          hidden: stringIsNullOrWhiteSpace(audio),
        },
        {
          label: mediaItemData.attachment.label,
          value: attachment,
          hidden: stringIsNullOrWhiteSpace(attachment),
        },
      ],
      props: {
        bordered: true,
        column: 1,
        size: 'small',
        labelStyle: {
          width: '80px',
        },
        emptyValue: '??????',
        emptyStyle: {
          color: '#ccc',
        },
      },
    });

    return (
      <>
        <Space direction="vertical" style={{ width: '100%' }}>
          {stringIsNullOrWhiteSpace(image) ? (
            grid
          ) : (
            <FlexBox
              flexAuto="right"
              left={
                stringIsNullOrWhiteSpace(image)
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
              text: '??????',
              icon: iconCollection.edit,
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
                  icon: iconCollection.insertRowBelow,
                  text: '???????????????',
                  hidden: !this.checkAuthority(accessWayCollection.article.addMediaItem.permission),
                },
                {
                  key: 'moveUp',
                  withDivider: true,
                  uponDivider: true,
                  icon: iconCollection.arrowUp,
                  text: '????????????',
                  hidden: !this.checkAuthority(accessWayCollection.article.updateSort.permission),
                  disabled: sort === 1,
                },
                {
                  key: 'moveDown',
                  icon: iconCollection.arrowDown,
                  text: '????????????',
                  hidden: !this.checkAuthority(accessWayCollection.article.updateSort.permission),
                  disabled: sort === (mediaItemList || []).length,
                },
                {
                  key: 'refreshCache',
                  withDivider: true,
                  uponDivider: true,
                  icon: iconCollection.reload,
                  text: '????????????',
                  hidden: !this.checkAuthority(accessWayCollection.article.refreshCache.permission),
                  confirm: {
                    title: '?????????????????????????????????',
                  },
                },
                {
                  key: 'removeItem',
                  withDivider: true,
                  uponDivider: true,
                  icon: iconCollection.delete,
                  text: '????????????',
                  hidden: !this.checkAuthority(
                    accessWayCollection.article.removeMediaItem.permission,
                  ),
                  confirm: {
                    title: '?????????????????????????????????',
                  },
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
          title: '??????????????????',
          component: (
            <>
              <span>?????????????????????{mediaItemCount}</span>
            </>
          ),
        },
        {
          title: '??????????????????',
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
              {iconCollection.plusCircle}
              ????????????
            </Button>
          ),
        },
        {
          title: '????????????',
          component: (
            <Button
              disabled={this.checkLoadingProgress()}
              onClick={() => {
                this.showMediaItemPreviewDrawer();
              }}
            >
              {iconCollection.eye} ??????
            </Button>
          ),
        },
        {
          title: '????????????',
          component: this.renderRefreshButton(),
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '????????????',
      list: [
        {
          text: '?????????????????????????????????????????????',
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
            text: '??????????????????',
          },
          spinning,
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

  establishPageContentLayoutSiderConfig = () => {
    return { width: 400 };
  };

  renderSiderTopArea = () => {
    const { mediaItemList } = this.state;

    return (
      <MobilePreviewBox
        affix
        affixOffsetTop={20}
        mobileList={[mobileTypeCollection.roughSketch, mobileTypeCollection.iPhone5S]}
        data={mediaItemList || []}
      />
    );
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
