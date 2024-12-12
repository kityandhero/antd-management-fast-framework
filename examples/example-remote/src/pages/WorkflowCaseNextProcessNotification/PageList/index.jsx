import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessNotificationPageList } from '../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { WorkflowCaseNextProcessNotificationPreviewDrawer } from '../PreviewDrawer';

@connect(({ workflowCaseNextProcessNotification, schedulingControl }) => ({
  workflowCaseNextProcessNotification,
  schedulingControl,
}))
class PageList extends BaseFlowCaseNextProcessNotificationPageList {
  componentAuthority =
    accessWayCollection.workflowCaseNextProcessNotification.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey:
        accessWayCollection.workflowCaseNextProcessNotification.pageList
          .paramsKey,
      loadApiPath:
        modelTypeCollection.workflowCaseNextProcessNotificationTypeCollection
          .pageList,
      currentRecord: null,
    };
  }

  getFlowCaseNextProcessNotificationIdDataTarget = () => {
    return fieldData.workflowCaseNextProcessNotificationId;
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkGetAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessNotification.get.permission,
    );
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessNotification.refreshCache
        .permission,
    );
  };

  preview = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        WorkflowCaseNextProcessNotificationPreviewDrawer.open();
      },
    );
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <WorkflowCaseNextProcessNotificationPreviewDrawer
          maskClosable
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
