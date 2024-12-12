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
import { getDepartmentStatusName } from '../../../customSpecialComponents';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { addBasicInfoAction } from '../../UserDepartmentInfo/Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'c3dae4341ff846ad83e303bdf5ea21aa';

@connect(({ department, userDepartmentInfo, schedulingControl }) => ({
  department,
  userDepartmentInfo,
  schedulingControl,
}))
class PageListBindUserDrawer extends MultiPageDrawer {
  reloadWhenShow = false;

  componentAuthority = accessWayCollection.department.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置所属部门',
      loadApiPath: 'department/pageList',
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

    const departmentId = getValueByKey({
      data: r,
      key: fieldData.departmentId.name,
    });

    addBasicInfoAction({
      target: this,
      handleData: {
        userId: userId || 0,
        departmentId: departmentId || 0,
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
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.subsidiaryShortName,
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
      text: '设置所属',
      disabled: !checkHasAuthority(
        accessWayCollection.userDepartmentInfo.addBasicInfo.permission,
      ),
      handleButtonClick: () => {
        this.bind(record);
      },
      confirm: true,
      title: '立即设置所属部门，确定吗？',
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
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
          text: getDepartmentStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.departmentId,
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
