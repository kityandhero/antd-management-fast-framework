import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { BaseFlowCaseStorageFormDrawer } from '../../../pageBases/FlowCaseFormStorage/BaseFlowCaseStorageFormDrawer';
import { getChainByWorkflowAction } from '../../WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { AddAttachmentModal } from '../../WorkflowDebugCaseFormAttachment/AddAttachmentModal';
import { removeAction } from '../../WorkflowDebugCaseFormAttachment/Assist/action';
import { AttachmentPreviewDrawer as WorkflowDebugCaseFormAttachmentPreviewDrawer } from '../../WorkflowDebugCaseFormAttachment/AttachmentPreviewDrawer';

const visibleFlag = 'd5007ce0991442e4a553b3d2ab28f927';

@connect(
  ({
    workflowFormDesign,
    workflowDebugCase,
    workflowDebugCaseFormStorage,
    schedulingControl,
  }) => ({
    workflowFormDesign,
    workflowDebugCase,
    workflowDebugCaseFormStorage,
    schedulingControl,
  }),
)
class FormDrawer extends BaseFlowCaseStorageFormDrawer {
  componentAuthority =
    accessWayCollection.workflowCaseFormStorage.get.permission;

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
      pageTitle: '工作流测试实例表单',
      loadApiPath: 'workflowDebugCase/get',
      submitApiPath: 'workflowDebugCase/submitForm',
      currentAttachment: null,
    };
  }

  getFlowCaseId = () => {
    const { externalData } = this.props;

    return getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
    });
  };

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

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldDataWorkflowDebugCase.workflowDebugCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
    });

    return d;
  };

  removeAttachment = (o) => {
    removeAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  doOtherAfterSaveForm = () => {
    FormDrawer.close();
  };

  showAddAttachmentModal = () => {
    AddAttachmentModal.open();
  };

  openFlowCaseFormAttachmentPreviewDrawer = () => {
    WorkflowDebugCaseFormAttachmentPreviewDrawer.open();
  };

  renderPresetOther = () => {
    const { metaData, currentAttachment } = this.state;

    return (
      <>
        <AddAttachmentModal
          externalData={metaData}
          afterClose={this.afterAddAttachmentModalClose}
        />

        <WorkflowDebugCaseFormAttachmentPreviewDrawer
          maskClosable
          externalData={currentAttachment}
        />
      </>
    );
  };
}

export { FormDrawer };
