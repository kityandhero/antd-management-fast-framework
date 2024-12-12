/* eslint-disable no-unused-vars */
import { Divider, Empty, Space } from 'antd';

import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  formatCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  CenterBox,
  ColorText,
  HelpBox,
  iconBuilder,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  FileViewer,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import { FlowProcessHistory } from 'antd-management-fast-flow';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  emptySignet,
  fieldDataFlowCase,
  fieldDataFlowCaseFormAttachment,
  fieldDataFlowCaseProcessHistory,
  fieldDataFlowFormDesign,
  fieldDataFlowNode,
  flowApproveActionModeCollection,
  flowCaseStatusCollection,
  flowNodeTypeCollection,
  signetStyle,
} from '../../../customConfig';
import { BaseFlowCaseFormInfoDrawer } from '../../../pageBases';
import { buildFlowCaseFormInitialValues } from '../../../utils';

class WorkflowCaseFormInfoDrawer extends BaseFlowCaseFormInfoDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'workflowCase/get',
      submitApiPath: 'workflowCase/submitForm',
    };
  }

  loadChainApprove = () => {};

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  removeAttachment = (o) => {
    throw new Error('removeAttachment need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  submitApproval = (o, formValue) => {
    throw new Error('submitApproval need overrode to implement');
  };

  cancelApprove = (o) => {
    throw new Error('cancelApprove need overrode to implement');
  };

  openFlowCaseFormAttachmentPreviewDrawer = () => {
    throw new Error(
      'openFlowCaseFormAttachmentPreviewDrawer need overrode to implement',
    );
  };

  openPassModal = () => {
    throw new Error('openPassModal need overrode to implement');
  };

  openRefuseModal = () => {
    throw new Error('openRefuseModal need overrode to implement');
  };

  openFlowDisplayDrawer = () => {
    throw new Error('openFlowDisplayDrawer need overrode to implement');
  };

  openAddAttachmentModal = () => {
    throw new Error('openAddAttachmentModal need overrode to implement');
  };

  openFlowCaseFormDocumentDrawer = () => {
    throw new Error(
      'openFlowCaseFormDocumentDrawer need overrode to implement',
    );
  };
}

export { WorkflowCaseFormInfoDrawer };
