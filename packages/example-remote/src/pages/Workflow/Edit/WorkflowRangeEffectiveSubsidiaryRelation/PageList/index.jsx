import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { getFlowRangeEffectiveRelationStatusName } from '../../../../../customSpecialComponents';
import { PageListAddWorkflowRangeEffectiveDrawer } from '../../../../Subsidiary/PageListAddWorkflowRangeEffectiveDrawer';
import {
  refreshCacheAction,
  removeAction,
} from '../../../../WorkflowRangeEffectiveSubsidiaryRelation/Assist/action';
import { getStatusBadge } from '../../../../WorkflowRangeEffectiveSubsidiaryRelation/Assist/tools';
import { fieldData } from '../../../../WorkflowRangeEffectiveSubsidiaryRelation/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ workflowRangeEffectiveSubsidiaryRelation, schedulingControl }) => ({
  workflowRangeEffectiveSubsidiaryRelation,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.workflowRangeEffectiveSubsidiaryRelation.pageList
      .permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '适用子公司列表',
      paramsKey:
        accessWayCollection.workflowRangeEffectiveSubsidiaryRelation.pageList
          .paramsKey,
      loadApiPath: 'workflowRangeEffectiveSubsidiaryRelation/pageList',
      dateRangeFieldName: '创建时间',
      workflowId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { workflowId } = this.state;

    d.workflowId = workflowId;

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'remove': {
        this.remove(handleData);

        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);

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
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showPageListAddWorkflowRangeEffectiveDrawer = () => {
    PageListAddWorkflowRangeEffectiveDrawer.open();
  };

  afterPageListAddWorkflowRangeEffectiveDrawerClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.subsidiaryShortName,
        },
        {
          lg: 5,
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
        type: 'primary',
        icon: iconBuilder.plusSquare(),
        text: '增加适用公司',
        handleClick: this.showPageListAddWorkflowRangeEffectiveDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '移除',
      icon: iconBuilder.delete(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowRangeEffectiveSubsidiaryRelation.remove
          .permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.remove(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      confirm: true,
      title: '即将移除适用关系，确定吗？',
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.subsidiaryShortName,
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
          text: getFlowRangeEffectiveRelationStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.subsidiaryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.workflowRangeEffectiveSubsidiaryRelationId,
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '列表中的公司可以使用该流程, 未显示在列表中的公司不可使用此工作流。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { workflowId } = this.state;

    return (
      <>
        <PageListAddWorkflowRangeEffectiveDrawer
          externalData={{ workflowId }}
          afterClose={this.afterPageListAddWorkflowRangeEffectiveDrawerClose}
        />
      </>
    );
  };
}

export default PageList;
