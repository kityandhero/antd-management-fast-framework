import { connect } from 'easy-soft-dva';
import { checkInCollection, filter, toString } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import {
  flowNodeApproveModeCollection,
  flowNodeApproverModeCollection,
} from '../../../customConfig';
import { BaseAddPointDrawer } from '../BaseAddPointDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '709b7d9a521c45abbec25f6c6568a9a2';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddIntermediatePointDrawer extends BaseAddPointDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  currentApproveMode = toString(
    flowNodeApproverModeCollection.directlyAffiliatedDepartment,
  );

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增过程点',
      submitApiPath: 'workflowNode/addIntermediatePoint',
    };
  }

  adjustApproverModeListData = (list) => {
    const listAdjust = filter(list, (one) => {
      const { flag } = one;

      return checkInCollection(
        [
          toString(flowNodeApproverModeCollection.designated),
          toString(flowNodeApproverModeCollection.directlyAffiliatedDepartment),
        ],
        toString(flag),
      );
    });

    return listAdjust;
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.approverMode.name] = toString(
      flowNodeApproverModeCollection.designated,
    );

    initialValues[fieldData.approveMode.name] = toString(
      flowNodeApproveModeCollection.oneOfApproval,
    );

    return initialValues;
  };

  renderPresetTitle = () => {
    return '新增流程点';
  };
}

export { AddIntermediatePointDrawer };
