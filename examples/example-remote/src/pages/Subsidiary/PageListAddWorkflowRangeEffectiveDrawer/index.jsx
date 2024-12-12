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
import { addAction } from '../../WorkflowRangeEffectiveSubsidiaryRelation/Assist/action';
import { fieldData as fieldDataWorkflowRangeEffectiveSubsidiaryRelation } from '../../WorkflowRangeEffectiveSubsidiaryRelation/Common/data';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'f12f9033140d43818b33fc0b913281db';

@connect(({ subsidiary, userSubsidiaryInfo, schedulingControl }) => ({
  subsidiary,
  userSubsidiaryInfo,
  schedulingControl,
}))
class PageListAddWorkflowRangeEffectiveDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '增加流程适用的公司',
      loadApiPath: 'subsidiary/pageList',
      tableScrollX: 920,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  add = (r) => {
    const { externalData } = this.props;

    const workflowId = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowRangeEffectiveSubsidiaryRelation.workflowId.name,
    });

    const subsidiaryId = getValueByKey({
      data: r,
      key: fieldData.subsidiaryId.name,
    });

    addAction({
      target: this,
      handleData: {
        workflowId: workflowId || 0,
        subsidiaryId: subsidiaryId || 0,
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
      text: '设置适用',
      disabled: !checkHasAuthority(
        accessWayCollection.userSubsidiaryInfo.addBasicInfo.permission,
      ),
      handleButtonClick: () => {
        this.add(record);
      },
      confirm: true,
      title: '即将设置工作流适用与此公司，确定吗？',
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

export { PageListAddWorkflowRangeEffectiveDrawer };
