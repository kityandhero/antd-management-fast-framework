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
} from '../../../customSpecialComponents';
import { PageListDrawer } from '../../ChannelExecuteLogSwitch/PageListDrawer';
import {
  removeAction,
  removeAllAction,
  removeMultiAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ executeLog, schedulingControl }) => ({
  executeLog,
  schedulingControl,
}))
class Index extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '执行日志列表',
      paramsKey: accessWayCollection.executeLog.pageList.paramsKey,
      loadApiPath: 'executeLog/pageList',
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

      case 'remove': {
        this.remove(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  removeMulti = () => {
    let submitData = this.initLoadRequestParams() || {};

    submitData = pretreatmentRequestParameters(submitData || {});

    submitData = this.supplementLoadRequestParams(submitData || {});

    const checkResult = this.checkLoadRequestParams(submitData || {});

    if (!checkResult) {
      return;
    }

    removeMultiAction({
      target: this,
      handleData: submitData,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  removeAll = () => {
    removeAllAction({
      target: this,
      handleData: {},
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

  showSwitchDrawer = () => {
    PageListDrawer.open();
  };

  goToEdit = (record) => {
    const executeLogId = getValueByKey({
      data: record,
      key: fieldData.executeLogId.name,
    });

    this.goToPath(`/logs/executeLog/edit/load/${executeLogId}/key/basicInfo`);
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
        handleClick: this.removeMulti,
        confirm: true,
        title: '即将根据搜索条件批量删除日志，确定吗？',
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'dashed',
        icon: iconBuilder.delete(),
        text: '全量删除',
        handleClick: this.removeAll,
        confirm: true,
        title: '即将删除全部日志，确定吗？',
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.divider,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        icon: iconBuilder.swap(),
        text: '日志开关',
        handleClick: this.showSwitchDrawer,
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
          key: 'remove',
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
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.declaringTypeName,
      width: 360,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.declaringTypeNamespace,
      width: 400,
      sorter: false,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.triggerChannel,
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
      dataTarget: fieldData.executeLogId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.executeTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PageListDrawer maskClosable />

        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default Index;
