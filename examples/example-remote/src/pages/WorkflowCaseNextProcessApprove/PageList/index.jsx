import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessApprovePageList } from '../../../pageBases';
import { refreshCacheAction } from '../../WorkflowCaseLatestApprove/Assist/action';
import { fieldData } from '../../WorkflowCaseLatestApprove/Common/data';
import { WorkflowCaseNextProcessApprovePreviewDrawer } from '../PreviewDrawer';

@connect(({ workflowCaseNextProcessApprove, schedulingControl }) => ({
  workflowCaseNextProcessApprove,
  schedulingControl,
}))
class PageList extends BaseFlowCaseNextProcessApprovePageList {
  componentAuthority =
    accessWayCollection.workflowCaseNextProcessApprove.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey:
        accessWayCollection.workflowCaseNextProcessApprove.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.workflowCaseNextProcessApproveTypeCollection
          .pageList,
      currentRecord: null,
    };
  }

  getFlowCaseNextProcessApproveIdDataTarget = () => {
    return fieldData.workflowCaseLatestApproveId;
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkGetAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessApprove.get.permission,
    );
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessApprove.refreshCache
        .permission,
    );
  };

  preview = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        WorkflowCaseNextProcessApprovePreviewDrawer.open();
      },
    );
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <WorkflowCaseNextProcessApprovePreviewDrawer
          maskClosable
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
