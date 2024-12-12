import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getFileTypeName,
  getUploadHistorySourceTypeName,
  getUploadHistoryStatusName,
  renderSearchFileTypeSelect,
  renderSearchUploadHistorySourceTypeSelect,
} from '../../../customSpecialComponents';
import { refreshCacheAction, removeAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';
import { UploadAudioModal } from '../UploadAudioModal';
import { UploadFileModal } from '../UploadFileModal';
import { UploadImageModal } from '../UploadImageModal';
import { UploadVideoModal } from '../UploadVideoModal';

const { MultiPage } = DataMultiPageView;

@connect(({ uploadHistory, schedulingControl }) => ({
  uploadHistory,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.uploadHistory.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '上传历史列表',
      paramsKey: accessWayCollection.uploadHistory.pageList.paramsKey,
      loadApiPath: 'uploadHistory/pageList',
      dateRangeFieldName: '上传时间',
      tableScrollX: 1520,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
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

  showPreviewDrawer = (item) => {
    this.setState({ currentRecord: item }, () => {
      PreviewDrawer.open();
    });
  };

  showUploadImageModal = () => {
    UploadImageModal.open();
  };

  afterUploadImageModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUploadAudioModal = () => {
    UploadAudioModal.open();
  };

  afterUploadAudioModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUploadVideoModal = () => {
    UploadVideoModal.open();
  };

  afterUploadVideoModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUploadFileModal = () => {
    UploadFileModal.open();
  };

  afterUploadFileModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.fileType.name] = unlimitedWithStringFlag.flag;
    values[fieldData.sourceType.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 4,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.alias,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFileTypeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchUploadHistorySourceTypeSelect({}),
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
        type: 'default',
        icon: iconBuilder.upload(),
        text: '上传图片',
        handleClick: this.showUploadImageModal,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        icon: iconBuilder.upload(),
        text: '上传音频',
        handleClick: this.showUploadAudioModal,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        icon: iconBuilder.upload(),
        text: '上传视频',
        handleClick: this.showUploadVideoModal,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        icon: iconBuilder.upload(),
        text: '上传文件',
        handleClick: this.showUploadFileModal,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.uploadHistory.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除信息',
          hidden: !checkHasAuthority(
            accessWayCollection.uploadHistory.remove.permission,
          ),
          confirm: true,
          title: '将要移除信息，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.uploadHistory.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 260,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.alias,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.previewUrl,
      width: 80,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.size,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.suffix,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.fileType,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 9,
          }),
        };
      },
      formatValue: (value) => {
        return getFileTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.sourceType,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 9,
          }),
        };
      },
      formatValue: (value) => {
        return getUploadHistorySourceTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getUploadHistoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.uploadHistoryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <UploadImageModal afterClose={this.afterUploadImageModalClose} />

        <UploadAudioModal afterClose={this.afterUploadAudioModalClose} />

        <UploadVideoModal afterClose={this.afterUploadVideoModalClose} />

        <UploadFileModal afterClose={this.afterUploadFileModalClose} />

        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
