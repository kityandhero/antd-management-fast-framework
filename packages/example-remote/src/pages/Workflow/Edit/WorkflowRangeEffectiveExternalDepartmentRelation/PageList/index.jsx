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
import { PageListAddWorkflowRangeEffectiveDrawer } from '../../../../Department/PageListAddWorkflowRangeEffectiveDrawer';
import {
  refreshCacheAction,
  removeAction,
} from '../../../../WorkflowRangeEffectiveExternalDepartmentRelation/Assist/action';
import { getStatusBadge } from '../../../../WorkflowRangeEffectiveExternalDepartmentRelation/Assist/tools';
import { fieldData } from '../../../../WorkflowRangeEffectiveExternalDepartmentRelation/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(
  ({
    workflowRangeEffectiveExternalDepartmentRelation,
    schedulingControl,
  }) => ({
    workflowRangeEffectiveExternalDepartmentRelation,
    schedulingControl,
  }),
)
class PageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.workflowRangeEffectiveExternalDepartmentRelation
      .pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '适用外部部门列表',
      paramsKey:
        accessWayCollection.workflowRangeEffectiveExternalDepartmentRelation
          .pageList.paramsKey,
      loadApiPath: 'workflowRangeEffectiveExternalDepartmentRelation/pageList',
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
          fieldData: fieldData.departmentName,
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
        icon: iconBuilder.setting(),
        text: '设置归属部门',
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
        accessWayCollection.workflowRangeEffectiveExternalDepartmentRelation
          .remove.permission,
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
      dataTarget: fieldData.departmentName,

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
      dataTarget: fieldData.workflowRangeEffectiveExternalDepartmentRelationId,
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
