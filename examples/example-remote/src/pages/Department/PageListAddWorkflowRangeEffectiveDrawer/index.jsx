import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSuccessNotification,
} from 'easy-soft-utility';

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
import { addAction } from '../../WorkflowRangeEffectiveExternalDepartmentRelation/Assist/action';
import { fieldData as fieldDataWorkflowRangeEffectiveSubsidiaryRelation } from '../../WorkflowRangeEffectiveSubsidiaryRelation/Common/data';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '483eb1d7611a47b788a9f2df466d1168';

@connect(({ department, userSubsidiaryInfo, schedulingControl }) => ({
  department,
  userSubsidiaryInfo,
  schedulingControl,
}))
class PageListAddWorkflowRangeEffectiveDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.department.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '增加流程适用的外部部门',
      loadApiPath: 'department/pageList',
      tableScrollX: 920,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    return {
      ...d,
      ownershipMode: 300,
    };
  };

  add = (r) => {
    const { externalData } = this.props;

    const workflowId = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowRangeEffectiveSubsidiaryRelation.workflowId.name,
    });

    const departmentId = getValueByKey({
      data: r,
      key: fieldData.departmentId.name,
    });

    addAction({
      target: this,
      handleData: {
        workflowId: workflowId || 0,
        departmentId: departmentId || 0,
      },
      successCallback: () => {
        showSuccessNotification({
          title: '设置成功',
          placement: 'bottomLeft',
        });
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

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      icon: iconBuilder.select(),
      text: '设置适用',
      disabled: !checkHasAuthority(
        accessWayCollection.userSubsidiaryInfo.addBasicInfo.permission,
      ),
      handleButtonClick: () => {
        this.add(record);
      },
      confirm: true,
      title: '即将设置工作流适用与此外部部门，确定吗？',
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

export { PageListAddWorkflowRangeEffectiveDrawer };
