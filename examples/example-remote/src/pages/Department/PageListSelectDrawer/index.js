import { connect } from 'easy-soft-dva';
import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getDepartmentOwnershipModeName,
  getDepartmentStatusName,
} from '../../../customSpecialComponents';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '8665a0a50bd34449959f28b883cbc81d';

@connect(({ department, schedulingControl }) => ({
  department,
  schedulingControl,
}))
class PageListSelectDrawer extends MultiPageSelectDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.department.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'department/pageList',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { searchParams } = this.props;

    return { ...searchParams, ...d };
  };

  getPageName = () => {
    return '请选择上级部门';
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.departmentId,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
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
      dataTarget: fieldData.ownershipMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 29,
          }),
        };
      },
      formatValue: (value) => {
        return getDepartmentOwnershipModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.parentName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 180,
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
      dataTarget: fieldData.parentId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
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

PageListSelectDrawer.defaultProps = {
  searchParams: {},
};

export { PageListSelectDrawer };
