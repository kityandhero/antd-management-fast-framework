import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  getValueByKey,
  pretreatmentRequestParameters,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  renderSearchChannelSelect,
  renderSearchGeneralLogTypeSelect,
} from '../../../customSpecialComponents';
import { deleteAction, deleteMultiAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ generalLog, schedulingControl }) => ({
  generalLog,
  schedulingControl,
}))
class Index extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '异常列表',
      paramsKey: accessWayCollection.generalLog.pageList.paramsKey,
      loadApiPath: 'generalLog/pageList',
      dateRangeFieldName: '发生时段',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);

        break;
      }

      case 'delete': {
        this.delete(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  delete = (r) => {
    deleteAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  deleteMulti = () => {
    let submitData = this.initLoadRequestParams() || {};

    submitData = pretreatmentRequestParameters(submitData || {});

    submitData = this.supplementLoadRequestParams(submitData || {});

    const checkResult = this.checkLoadRequestParams(submitData || {});

    if (!checkResult) {
      return;
    }

    deleteMultiAction({
      target: this,
      handleData: submitData,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  goToEdit = (record) => {
    const generalLogId = getValueByKey({
      data: record,
      key: fieldData.generalLogId.name,
    });

    this.goToPath(`/logs/generalLog/edit/load/${generalLogId}/key/basicInfo`);
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    return values;
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchGeneralLogTypeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchChannelSelect({}),
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardRangePickerCore(dateRangeFieldName),
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
        type: 'dashed',
        icon: iconBuilder.delete(),
        text: '批量删除',
        handleClick: this.deleteMulti,
        confirm: true,
        title: '即将根据搜索条件批量删除日志，确定吗？',
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'goToEdit',
          icon: iconBuilder.read(),
          text: '日志详情',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'delete',
          icon: iconBuilder.delete(),
          text: '删除日志',
          confirm: true,
          title: '即将删除日志，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.message,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.typeNote,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 150,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 31,
          }),
        };
      },
      formatValue: (value) => {
        return getChannelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.generalLogId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default Index;
