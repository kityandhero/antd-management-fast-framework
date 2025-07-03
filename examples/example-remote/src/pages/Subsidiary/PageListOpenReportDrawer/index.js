import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getSubsidiaryStatusName } from '../../../customSpecialComponents';
import { toggleReportSwitchAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { PageListCloseReportModal } from '../PageListCloseReportModal';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '5643d4e1af484a34aaa72c3c4d544763';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class PageListOpenReportDrawer extends MultiPageDrawer {
  reloadWhenShow = false;

  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '已开启举报功能的企业列表',
      loadApiPath: 'subsidiary/pageList',
      tableScrollX: 1200,
      listViewMode: listViewConfig.viewMode.table,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    d[fieldData.reportSwitch.name] = whetherNumber.yes;

    return d;
  };

  toggleReportSwitch = (o) => {
    toggleReportSwitchAction({
      target: this,
      handleData: o,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  showPageListCloseReportModal = () => {
    PageListCloseReportModal.open();
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.shortName,
        },
        {
          lg: 8,
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
          listViewConfig.dataContainerExtraActionBuildType.generalExtraButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '添加',
        handleClick: this.showPageListCloseReportModal,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '关闭',
      icon: iconBuilder.close(),
      disabled: !checkHasAuthority(
        accessWayCollection.subsidiary.toggleReportSwitch.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.toggleReportSwitch(handleData);
      },
      handleData: record,
      confirm: true,
      title: '即将关闭该企业的投诉功能,确定吗？',
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.logo,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.shortName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.fullName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.code,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.reportSwitchNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const reportSwitch = getValueByKey({
          data: o,
          key: fieldData.reportSwitch.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(reportSwitch) * 25 + 47,
          }),
        };
      },
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
          text: getSubsidiaryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.subsidiaryId,
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
    return (
      <PageListCloseReportModal
        width={1200}
        afterSelectSuccess={this.toggleReportSwitch}
      />
    );
  };
}

export { PageListOpenReportDrawer };
