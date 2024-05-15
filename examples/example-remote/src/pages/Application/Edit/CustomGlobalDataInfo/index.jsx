import { List, Space } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
} from 'easy-soft-utility';

import {
  cardConfig,
  dataTypeCollection,
  defaultEmptyImage,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  buildButton,
  buildCustomGrid,
  buildDropdownButton,
  buildListViewItemExtra,
  buildStatusBar,
  FlexBox,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataPreviewDrawer } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  keyValueItemData,
} from '../../../../customConfig';
import { getJsonItemTypeName } from '../../../../customSpecialComponents';
import { AddJsonItemDrawer } from '../../AddJsonItemDrawer';
import { removeCustomGlobalDataItemAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { TabPageBase } from '../../TabPageBase';
import { UpdateJsonItemDrawer } from '../../UpdateJsonItemDrawer';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.application.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'application/getCustomGlobalData',
      applicationId: null,
      itemList: [],
      itemCount: 0,
      currentItem: null,
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

  buildInitialValues = (
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
    const { customGlobalListItem: itemSourceList } = metaData;

    const itemList = [];

    for (const item of itemSourceList || []) {
      const o = {
        ...item,
        key: item.id,
      };

      itemList.push(o);
    }

    this.setState({
      metaData,
      itemList,
      itemCount: itemList.length,
    });
  };

  showInsertJsonItemDrawer = (record) => {
    this.setState({
      selectForwardId: getValueByKey({
        data: record,
        key: keyValueItemData.id.name,
      }),
    });
  };

  showAddJsonItemDrawer = () => {
    this.setState(
      {
        selectForwardId: '',
      },
      () => {
        AddJsonItemDrawer.open();
      },
    );
  };

  showUpdateJsonItemDrawer = (record) => {
    this.setState(
      {
        selectForwardId: '',
        currentItem: record,
      },
      () => {
        UpdateJsonItemDrawer.open();
      },
    );
  };

  afterAddJsonItemDrawerOk = () => {
    const that = this;

    that.setState(
      {
        selectForwardId: '',
      },
      () => {
        that.refreshData({});
      },
    );
  };

  afterUpdateJsonItemDrawerOk = () => {
    this.refreshData({});
  };

  handleMenuClick = ({ key, handleData }) => {
    const { applicationId } = this.state;

    switch (key) {
      case 'removeItem': {
        removeCustomGlobalDataItemAction({
          target: this,
          handleData: { ...handleData, applicationId },
          successCallback: ({ target }) => {
            target.reloadData({});
          },
        });
        break;
      }

      default: {
        break;
      }
    }
  };

  openDataPreviewDrawer = () => {
    DataPreviewDrawer.open();
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

  renderPresetListViewItemInner = (item, index) => {
    const text = getValueByKey({
      data: item,
      key: keyValueItemData.text.name,
    });

    const multiText = getValueByKey({
      data: item,
      key: keyValueItemData.multiText.name,
    });

    const image = getValueByKey({
      data: item,
      key: keyValueItemData.image.name,
    });

    const link = getValueByKey({
      data: item,
      key: keyValueItemData.link.name,
    });

    const video = getValueByKey({
      data: item,
      key: keyValueItemData.video.name,
    });

    const audio = getValueByKey({
      data: item,
      key: keyValueItemData.audio.name,
    });

    const attachment = getValueByKey({
      data: item,
      key: keyValueItemData.attachment.name,
    });

    const grid = buildCustomGrid({
      list: [
        {
          span: 2,
          label: keyValueItemData.type.label,
          value: getJsonItemTypeName({
            value: getValueByKey({
              data: item,
              key: keyValueItemData.type.name,
            }),
          }),
        },
        {
          span: 2,
          label: keyValueItemData.image.label,
          value: image,
          hidden: checkStringIsNullOrWhiteSpace(image),
        },
        {
          span: 2,
          label: keyValueItemData.text.label,
          value: text,
          hidden: checkStringIsNullOrWhiteSpace(text),
        },
        {
          span: 2,
          label: keyValueItemData.multiText.label,
          value: multiText,
          hidden: checkStringIsNullOrWhiteSpace(multiText),
        },
        {
          span: 2,
          label: keyValueItemData.link.label,
          value: link,
          hidden: checkStringIsNullOrWhiteSpace(link),
        },
        {
          span: 2,
          label: keyValueItemData.video.label,
          value: video,
          hidden: checkStringIsNullOrWhiteSpace(video),
        },
        {
          span: 2,
          label: keyValueItemData.audio.label,
          value: audio,
          hidden: checkStringIsNullOrWhiteSpace(audio),
        },
        {
          span: 2,
          label: keyValueItemData.attachment.label,
          value: attachment,
          hidden: checkStringIsNullOrWhiteSpace(attachment),
        },
      ],
      props: {
        bordered: true,
        column: 2,
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
                        data: item,
                        key: keyValueItemData.image.name,
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

          {buildStatusBar({
            actionList: [
              {
                label: keyValueItemData.id.label,
                text: getValueByKey({
                  data: item,
                  key: keyValueItemData.id.name,
                }),
                canCopy: true,
                color: '#999999',
              },
              {
                label: keyValueItemData.title.label,
                text: getValueByKey({
                  data: item,
                  key: keyValueItemData.title.name,
                }),
                color: '#999999',
              },
              {
                label: keyValueItemData.createTime.label,
                text: getValueByKey({
                  data: item,
                  key: keyValueItemData.createTime.name,
                }),
                color: '#999999',
              },
            ],
            extra: buildDropdownButton({
              size: 'small',
              text: '编辑',
              placement: 'topRight',
              icon: iconBuilder.edit(),
              handleButtonClick: ({ handleData }) => {
                this.showUpdateJsonItemDrawer(handleData);
              },
              handleData: item,
              handleMenuClick: ({ key, handleData }) => {
                this.handleMenuClick({ key, handleData });
              },
              items: [
                {
                  key: 'removeItem',
                  icon: iconBuilder.delete(),
                  text: '删除信息',
                  confirm: true,
                  title: '将要删除信息，确定吗？',
                },
              ],
            }),
          })}
        </Space>
      </>
    );
  };

  establishToolBarConfig = () => {
    const { firstLoadSuccess, itemCount } = this.state;

    return {
      stick: true,
      tools: [
        {
          title: '当前数据总数',
          component: (
            <>
              <span>当前数据总数：{itemCount}</span>
            </>
          ),
        },
        {
          component: buildButton({
            type: 'primary',
            icon: iconBuilder.plusCircle(),
            text: '新增项',
            disabled:
              !firstLoadSuccess ||
              !checkHasAuthority(
                accessWayCollection.application.addCustomGlobalDataItem
                  .permission,
              ),
            handleClick: (event) => {
              this.showAddJsonItemDrawer(event);
            },
          }),
        },
        {
          component: buildButton({
            type: 'default',
            icon: iconBuilder.read(),
            text: '预览Json',
            disabled: !firstLoadSuccess,
            handleClick: () => {
              this.openDataPreviewDrawer();
            },
          }),
        },
        {
          title: '刷新数据',
          component: this.renderPresetRefreshButton(),
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { itemList } = this.state;

    return {
      list: [
        {
          title: {
            text: '图片媒体列表',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: this.renderPresetListView(itemList),
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '应用全局数据适用于控制应用的远端数据。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { applicationId, itemList, currentItem, selectForwardId } =
      this.state;

    return (
      <>
        <AddJsonItemDrawer
          externalData={{
            applicationId,
            forwardId: selectForwardId,
          }}
          afterOK={() => {
            this.afterAddJsonItemDrawerOk();
          }}
        />

        <UpdateJsonItemDrawer
          externalData={{ ...currentItem, applicationId }}
          afterOK={() => {
            this.afterUpdateJsonItemDrawerOk();
          }}
        />

        <DataPreviewDrawer
          maskClosable
          title="Json预览"
          descriptionLabel="简要描述"
          description="应用全局自定义数据结构概览"
          dataType={dataTypeCollection.jsonObjectList.flag}
          data={itemList}
        />
      </>
    );
  };
}

export default BasicInfo;
