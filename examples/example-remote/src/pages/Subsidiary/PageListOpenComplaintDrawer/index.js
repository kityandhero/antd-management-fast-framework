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
import { toggleComplaintSwitchAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { PageListCloseComplaintModal } from '../PageListCloseComplaintModal';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'e0dbfb20fcd34711bb09807a4f8e1c91';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class PageListOpenComplaintDrawer extends MultiPageDrawer {
  reloadWhenShow = false;

  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '已开启投诉功能的企业列表',
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

    d[fieldData.complaintSwitch.name] = whetherNumber.yes;

    return d;
  };

  toggleComplaintSwitch = (o) => {
    toggleComplaintSwitchAction({
      target: this,
      handleData: o,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  showPageListCloseComplaintModal = () => {
    PageListCloseComplaintModal.open();
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
        handleClick: this.showPageListCloseComplaintModal,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '关闭',
      icon: iconBuilder.close(),
      disabled: !checkHasAuthority(
        accessWayCollection.subsidiary.toggleComplaintSwitch.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.toggleComplaintSwitch(handleData);
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
      dataTarget: fieldData.complaintSwitchNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const complaintSwitch = getValueByKey({
          data: o,
          key: fieldData.complaintSwitch.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(complaintSwitch) * 25 + 47,
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
      <PageListCloseComplaintModal
        width={1200}
        afterSelectSuccess={this.toggleComplaintSwitch}
      />
    );
  };
}

export { PageListOpenComplaintDrawer };
