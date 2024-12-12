import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseProcessHistoryPageList } from '../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { WorkFlowCaseProcessHistoryPreviewDrawer } from '../PreviewDrawer';

@connect(({ workflowCaseProcessHistory, schedulingControl }) => ({
  workflowCaseProcessHistory,
  schedulingControl,
}))
class PageList extends BaseFlowCaseProcessHistoryPageList {
  componentAuthority =
    accessWayCollection.workflowCaseProcessHistory.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '流程实例审批历史列表',
      paramsKey:
        accessWayCollection.workflowCaseProcessHistory.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.workflowCaseProcessHistoryTypeCollection.pageList,
      currentRecord: null,
    };
  }

  getFlowCaseProcessHistoryIdDataTarget = () => {
    return fieldData.workflowCaseProcessHistoryId;
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkGetAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseProcessHistory.get.permission,
    );
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseProcessHistory.refreshCache.permission,
    );
  };

  preview = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        WorkFlowCaseProcessHistoryPreviewDrawer.open();
      },
    );
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <WorkFlowCaseProcessHistoryPreviewDrawer
          maskClosable
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
