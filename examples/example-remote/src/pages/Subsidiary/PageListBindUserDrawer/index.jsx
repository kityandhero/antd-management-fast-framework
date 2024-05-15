import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getSubsidiaryStatusName } from '../../../customSpecialComponents';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { addBasicInfoAction } from '../../UserSubsidiaryInfo/Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'e2ec860530a64abeb290fc60c04656e4';

@connect(({ subsidiary, userSubsidiaryInfo, schedulingControl }) => ({
  subsidiary,
  userSubsidiaryInfo,
  schedulingControl,
}))
class PageListBindUserDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置归属公司',
      loadApiPath: 'subsidiary/pageList',
      tableScrollX: 920,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  bind = (r) => {
    const { externalData } = this.props;

    const userId = getValueByKey({
      data: externalData,
      key: fieldDataUser.userId.name,
    });

    const subsidiaryId = getValueByKey({
      data: r,
      key: fieldData.subsidiaryId.name,
    });

    addBasicInfoAction({
      target: this,
      handleData: {
        userId: userId || 0,
        subsidiaryId: subsidiaryId || 0,
      },
      successCallback: ({ target }) => {
        target.refreshData({});
      },
    });
  };

  renderPresetTitleIcon = () => null;

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

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      icon: iconBuilder.select(),
      text: '设置归属',
      disabled: !checkHasAuthority(
        accessWayCollection.userSubsidiaryInfo.addBasicInfo.permission,
      ),
      handleButtonClick: () => {
        this.bind(record);
      },
      confirm: true,
      title: '立即设置归属公司，确定吗？',
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.shortName,
      align: 'left',
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
}

export { PageListBindUserDrawer };
