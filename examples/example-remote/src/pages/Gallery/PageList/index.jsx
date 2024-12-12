import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  buildListViewItemInnerWithDropdownButton,
  ColorText,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getGalleryStatusName,
  renderSearchGalleryStatusSelect,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  removeAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ gallery, schedulingControl }) => ({
  gallery,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.gallery.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '展示图列表',
      paramsKey: accessWayCollection.gallery.pageList.paramsKey,
      listViewMode: listViewConfig.viewMode.list,
      loadApiPath: 'gallery/pageList',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const galleryId = getValueByKey({
      data: handleData,
      key: fieldData.galleryId.name,
    });

    handleItem({
      target,
      value: galleryId,
      compareValueHandler: (o) => {
        const { galleryId: v } = o;

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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'updateSort': {
        this.showChangeSortModal(handleData);
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

      case 'remove': {
        this.remove(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
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

  remove = (record) => {
    removeAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  showChangeSortModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeSortModal.open();
    });
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
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToAdd = () => {
    this.goToPath(`/assistTools/gallery/add`);
  };

  goToEdit = (record) => {
    const galleryId = getValueByKey({
      data: record,
      key: fieldData.galleryId.name,
    });

    this.goToPath(`/assistTools/gallery/edit/load/${galleryId}/key/basicInfo`);
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
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
          component: renderSearchGalleryStatusSelect({}),
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
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldData.imageUrl.name,
        defaultValue: defaultEmptyImage,
      }),
    });
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return buildListViewItemInnerWithDropdownButton({
      title: {
        label: fieldData.title.label,
        text: getValueByKey({
          data: item,
          key: fieldData.title.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.categoryName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.categoryName.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
        {
          label: fieldData.typeNote.label,
          text: getValueByKey({
            data: item,
            key: fieldData.typeNote.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={fieldData.status.label}
              text={getGalleryStatusName({
                value: status,
              })}
              randomColor
              randomSeed={status}
              separatorStyle={{
                paddingRight: '4px',
              }}
              seedOffset={18}
            />
          ),
        },
      ],
      actionList: [
        {
          label: fieldData.galleryId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.galleryId.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.sort.label,
          text: getValueByKey({
            data: item,
            key: fieldData.sort.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
        {
          label: fieldData.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldData.createTime.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
      ],
      extra: {
        size: 'small',
        text: '编辑',
        placement: 'topRight',
        icon: iconBuilder.edit(),
        disabled: !checkHasAuthority(
          accessWayCollection.gallery.updateBasicInfo.permission,
        ),
        handleButtonClick: ({ handleData }) => {
          this.goToEdit(handleData);
        },
        handleData: item,
        handleMenuClick: ({ key, handleData }) => {
          this.handleMenuClick({ key, handleData });
        },
        items: [
          {
            key: 'updateSort',
            icon: iconBuilder.edit(),
            text: '设置排序值',
          },
          {
            withDivider: true,
            uponDivider: true,
            key: 'setOnline',
            icon: iconBuilder.upload(),
            text: '设为上线',
            disabled: status === statusCollection.online,
            confirm: true,
            title: '将要设为上线，确定吗？',
          },
          {
            key: 'setOffline',
            icon: iconBuilder.download(),
            text: '设为下线',
            disabled: status === statusCollection.offline,
            confirm: true,
            title: '将要设为下线，确定吗？',
          },
          {
            withDivider: true,
            uponDivider: true,
            key: 'refreshCache',
            icon: iconBuilder.reload(),
            text: '刷新缓存',
            confirm: true,
            title: '将要刷新缓存，确定吗？',
          },
          {
            withDivider: true,
            uponDivider: true,
            key: 'remove',
            icon: iconBuilder.delete(),
            text: '移除数据',
            confirm: true,
            title: '将要移除数据，确定吗？',
          },
        ],
      },
    });
  };

  establishHelpConfig = () => {
    return {
      title: '简要说明',
      list: [
        {
          text: '数据排序顺序为，优先按照排序值降序排列, 然后按照创建时间降序排序.',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />
      </>
    );
  };
}

export default PageList;
