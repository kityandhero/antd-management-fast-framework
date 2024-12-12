/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  toString,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { BaseFlowCaseProcessHistoryRefuseModal } from '../../../pageBases';
import { singleListAction } from '../../GeneralDiscourse/Assist/action';
import { typeCollection } from '../../GeneralDiscourse/Common/data';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { fieldData } from '../Common/data';

const visibleFlag = '8a64e042f60947c48953f9ee18f02e5a';

@connect(
  ({
    workflowDebugCaseProcessHistory,
    generalDiscourse,
    schedulingControl,
  }) => ({
    workflowDebugCaseProcessHistory,
    generalDiscourse,
    schedulingControl,
  }),
)
class RefuseModal extends BaseFlowCaseProcessHistoryRefuseModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowDebugCase/get',
      submitApiPath: 'workflowDebugCaseProcessHistory/refuse',
    };
  }

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  getFlowCaseIdName = () => {
    return fieldDataWorkflowDebugCase.workflowDebugCaseId.name;
  };
}

export { RefuseModal };
