import { Empty } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  showSimpleInfoMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  FileViewer,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { AddAttachmentModal } from '../../WorkflowDebugCaseFormAttachment/AddAttachmentModal';
import { removeAction } from '../../WorkflowDebugCaseFormAttachment/Assist/action';
import { fieldData as fieldDataWorkflowDebugCaseFormAttachment } from '../../WorkflowDebugCaseFormAttachment/Common/data';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '059e3e4256924a218fb19c3fa58bb856';

function buildFormInitialValues(listFormStorage) {
  const data = {};

  if (isArray(listFormStorage) && !isEmptyArray(listFormStorage)) {
    for (const o of listFormStorage) {
      try {
        data[o.name] = JSON.parse(o.value);
      } catch {
        data[o.name] = o.value;
      }
    }
  }

  return data;
}

@connect(
  ({ workflowFormDesign, workflowCaseFormStorage, schedulingControl }) => ({
    workflowFormDesign,
    workflowCaseFormStorage,
    schedulingControl,
  }),
)
class FormDrawer extends BaseVerticalFlexDrawer {
  useFormWrapper = false;

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
      workflowId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
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

  supplementSubmitRequestParams = (o) => {
    return {
      ...o,
      ...this.supplementRequestParams(o),
    };
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

  saveForm = (o) => {
    this.execSubmitApi({
      values: o,
      successCallback: () => {
        FormDrawer.close();
      },
    });
  };

  showAddAttachmentModal = () => {
    AddAttachmentModal.open();
  };

  afterAddAttachmentModalClose = () => {
    this.reloadData({});
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '提交表单仅保存填充的信息。',
        },
        {
          text: '附件上传或删除后立即生效, 无需通过提交表单进行保存。',
        },
        {
          text: '处于审批中或审批已完成的流程实例表单不可编辑。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const { workflowFormDesign, listFormStorage, listAttachment } = {
      workflowFormDesign: {},
      listFormStorage: [],
      listAttachment: [],
      ...metaData,
    };

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.canEdit.name,
      convert: convertCollection.number,
    });

    const designJson = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataWorkflowFormDesign.designSchema.name,
    });

    const designData = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(designJson)
        ? {}
        : JSON.parse(designJson)),
    };

    const dataSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataWorkflowFormDesign.dataSchemaList.name,
      convert: convertCollection.array,
    });

    const hasDataSchema = dataSchemaList.length > 0;

    const initialValues = buildFormInitialValues(listFormStorage);

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataWorkflowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataWorkflowFormDesign.remarkColor.name,
      defaultValue: '',
    });

    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        <SchemaDisplayer
          {...designData}
          initialValues={initialValues}
          showSubmit={canEdit === whetherNumber.yes}
          showSubmitDivider={canEdit === whetherNumber.yes}
          submitButtonText="提交表单"
          descriptionTitleColor={remarkColor}
          descriptionLabelColor={remarkColor}
          descriptionTextColor={remarkColor}
          descriptions={remarkSchemaList}
          descriptionUpperLabel="附件列表"
          descriptionUpperComponent={
            <FileViewer
              canUpload
              canRemove
              list={listAttachment}
              dataTransfer={(o) => {
                return {
                  ...o,
                  name: getValueByKey({
                    data: o,
                    key: fieldDataWorkflowDebugCaseFormAttachment.alias.name,
                  }),
                  url: getValueByKey({
                    data: o,
                    key: fieldDataWorkflowDebugCaseFormAttachment.url.name,
                  }),
                };
              }}
              onUploadButtonClick={() => {
                this.showAddAttachmentModal();
              }}
              onItemClick={() => {
                showSimpleInfoMessage('示例: 点击预览按钮');
              }}
              onRemove={(o) => {
                this.removeAttachment(o);
              }}
            />
          }
          onSubmit={(o) => {
            this.saveForm(o);
          }}
        >
          {hasDataSchema ? null : (
            <Empty description="暂无表单设计，请首先进行设计" />
          )}
        </SchemaDisplayer>
      </div>
    );
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <AddAttachmentModal
          externalData={metaData}
          afterClose={this.afterAddAttachmentModalClose}
        />
      </>
    );
  };
}

export { FormDrawer };
