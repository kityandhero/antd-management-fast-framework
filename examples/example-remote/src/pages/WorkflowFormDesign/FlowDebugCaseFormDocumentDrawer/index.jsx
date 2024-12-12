import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, isArray } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFlowCaseFormDocumentDrawer } from '../../../pageBases';
import { getChainByWorkflowAction } from '../../WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';

const visibleFlag = '64d7f22032f54376a6af4777d475b680';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class FlowDebugCaseFormDocumentDrawer extends BaseFlowCaseFormDocumentDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      listChainApprove: [],
    };
  }

  loadChainApprove = () => {
    const { externalData } = this.props;

    getChainByWorkflowAction({
      target: this,
      handleData: {
        workflowId: getValueByKey({
          data: externalData,
          key: fieldDataWorkflowDebugCase.workflowId.name,
        }),
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowDebugCase.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: listChainApprove,
        });
      },
    });
  };

  reloadChainApprove = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      listChainApprove: [],
    });
  };

  getAllApproveProcessList = () => {
    const { listChainApprove } = this.state;

    const listChainApproveAdjust = isArray(listChainApprove)
      ? listChainApprove.map((o) => {
          const { name } = { name: '', ...o };

          return {
            title: name,
            ...o,
          };
        })
      : [];

    return listChainApproveAdjust;
  };
}

export { FlowDebugCaseFormDocumentDrawer };
