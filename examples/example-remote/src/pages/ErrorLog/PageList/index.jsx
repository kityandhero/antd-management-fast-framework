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
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getWebChannelName,
  renderSearchErrorLogResolveSelect,
  renderSearchWebChannelSelect,
} from '../../../customSpecialComponents';
import {
  removeAction,
  removeAllAction,
  removeMultiAction,
} from '../Assist/action';
import { getResolveBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ errorLog, schedulingControl }) => ({
  errorLog,
  schedulingControl,
}))
class Index extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '异常列表',
      paramsKey: accessWayCollection.errorLog.pageList.paramsKey,
      loadApiPath: 'errorLog/pageList',
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

  goToEdit = (record) => {
    const errorLogId = getValueByKey({
      data: record,
      key: fieldData.errorLogId.name,
    });

    this.goToPath(`/logs/errorLog/edit/load/${errorLogId}/key/basicInfo`);
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.resolve.name] = unlimitedWithStringFlag.flag;
    values[fieldData.channel.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchErrorLogResolveSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchWebChannelSelect({}),
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
      dataTarget: fieldData.message,
      align: 'left',
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
      dataTarget: fieldData.resolve,
      width: 100,
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value, record) => {
        return {
          status: getResolveBadge(value),
          text: record.resolveNote || '--',
        };
      },
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
        return getWebChannelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.errorLogId,
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
