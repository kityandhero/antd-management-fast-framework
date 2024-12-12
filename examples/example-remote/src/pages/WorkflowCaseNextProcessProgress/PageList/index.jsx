import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessProgressPageList } from '../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { WorkflowCaseNextProcessProgressPreviewDrawer } from '../PreviewDrawer';

@connect(({ workflowCaseNextProcessProgress, schedulingControl }) => ({
  workflowCaseNextProcessProgress,
  schedulingControl,
}))
class PageList extends BaseFlowCaseNextProcessProgressPageList {
  componentAuthority =
    accessWayCollection.workflowCaseNextProcessProgress.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey:
        accessWayCollection.workflowCaseNextProcessProgress.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.workflowCaseNextProcessProgressTypeCollection
          .pageList,
      currentRecord: null,
    };
  }

  getFlowCaseNextProcessProgressIdDataTarget = () => {
    return fieldData.workflowCaseNextProcessProgressId;
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkGetAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessProgress.get.permission,
    );
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessProgress.refreshCache
        .permission,
    );
  };

  preview = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        WorkflowCaseNextProcessProgressPreviewDrawer.open();
      },
    );
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <WorkflowCaseNextProcessProgressPreviewDrawer
          maskClosable
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
