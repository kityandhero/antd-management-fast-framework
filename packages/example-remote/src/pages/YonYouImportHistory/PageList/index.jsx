import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getYonYouImportHistoryStatusName } from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { ImportFileModal } from '../ImportFileModal';

const { MultiPage } = DataMultiPageView;

@connect(({ yonYouImportHistory, schedulingControl }) => ({
  yonYouImportHistory,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.yonYouImportHistory.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用友消息推送列表',
      paramsKey: accessWayCollection.yonYouImportHistory.pageList.paramsKey,
      loadApiPath: 'yonYouImportHistory/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemSendComplete = ({ target, handleData, remoteData }) => {
    const yonYouImportHistoryId = getValueByKey({
      data: handleData,
      key: fieldData.yonYouImportHistoryId.name,
    });

    handleItem({
      target,
      value: yonYouImportHistoryId,
      compareValueHandler: (o) => {
        const { yonYouImportHistoryId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.sendComplete.name] = getValueByKey({
          data: remoteData,
          key: fieldData.sendComplete.name,
        });

        return d;
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);

        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showImportFileModal = () => {
    ImportFileModal.open();
  };

  afterImportFileModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToEdit = (item) => {
    const yonYouImportHistoryId = getValueByKey({
      data: item,
      key: fieldData.yonYouImportHistoryId.name,
    });

    this.goToPath(
      `/person/yonYouImportHistory/edit/load/${yonYouImportHistoryId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.yonYouImportHistoryId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.personnelCode,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.sendComplete,
        },
        {
          lg: 4,
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
        text: '上传Execl',
        handleClick: this.showImportFileModal,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.form(),
      disabled: !checkHasAuthority(
        accessWayCollection.yonYouImportHistory.get.permission,
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
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.originalName,
      align: 'left',
      width: 260,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.filePath,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getYonYouImportHistoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.yonYouImportHistoryId,
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
        <ImportFileModal
          maskClosable
          externalData={currentRecord}
          afterClose={this.afterImportFileModalClose}
        />
      </>
    );
  };
}

export default PageList;
