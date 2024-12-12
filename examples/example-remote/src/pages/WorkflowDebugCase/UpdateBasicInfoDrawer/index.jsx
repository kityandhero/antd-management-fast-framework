import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFlowCaseUpdateBasicInfoDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '81f6a7389f5a40bea1342187be93672a';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseFlowCaseUpdateBasicInfoDrawer {
  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑测试实例信息',
      loadApiPath: 'workflowDebugCase/get',
      submitApiPath: 'workflowDebugCase/updateBasicInfo',
    };
  }

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldData.workflowDebugCaseId.name,
    });
  };

  getFlowCaseIdName = () => {
    return fieldData.workflowDebugCaseId.name;
  };
}

export { UpdateBasicInfoDrawer };
