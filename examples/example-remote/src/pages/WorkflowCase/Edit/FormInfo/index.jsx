import { Empty, Table } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  FileViewer,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import { FlowProcessHistory } from 'antd-management-fast-flow';

import {
  accessWayCollection,
  flowApproveActionModeCollection,
  flowNodeTypeCollection,
} from '../../../../customConfig';
import { fieldData as fieldDataWorkflowCaseFormAttachment } from '../../../WorkflowCaseFormAttachment/Common/data';
import { fieldData as fieldDataWorkflowCaseLatestApprove } from '../../../WorkflowCaseLatestApprove/Common/data';
import { fieldData as fieldDataWorkflowCaseNextProcessNotification } from '../../../WorkflowCaseNextProcessNotification/Common/data';
import { fieldData as fieldDataWorkflowCaseProcessHistory } from '../../../WorkflowCaseProcessHistory/Common/data';
import { fieldData as fieldDataWorkflowFormDesign } from '../../../WorkflowFormDesign/Common/data';
import { fieldData as fieldDataWorkflowNode } from '../../../WorkflowNode/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

const columnsNextProcessNotification = [
  {
    title:
      fieldDataWorkflowCaseNextProcessNotification.nextWorkflowNodeName.label,
    dataIndex:
      fieldDataWorkflowCaseNextProcessNotification.nextWorkflowNodeName.name,
    key: fieldDataWorkflowCaseNextProcessNotification.nextWorkflowNodeName.name,
    width: '200px',
  },
  {
    title: fieldDataWorkflowCaseNextProcessNotification.content.label,
    dataIndex: fieldDataWorkflowCaseNextProcessNotification.content.name,
    key: fieldDataWorkflowCaseNextProcessNotification.content.name,
    ellipsis: true,
  },
  {
    title:
      fieldDataWorkflowCaseNextProcessNotification.nextApproveUserRealName
        .label,
    dataIndex:
      fieldDataWorkflowCaseNextProcessNotification.nextApproveUserRealName.name,
    key: fieldDataWorkflowCaseNextProcessNotification.nextApproveUserRealName
      .name,
    align: 'center',
    ellipsis: true,
    width: '120px',
  },
  {
    title: fieldDataWorkflowCaseNextProcessNotification.whetherSendNote.label,
    dataIndex:
      fieldDataWorkflowCaseNextProcessNotification.whetherSendNote.name,
    key: fieldDataWorkflowCaseNextProcessNotification.whetherSendNote.name,
    align: 'center',
    ellipsis: true,
    width: '100px',
  },
  {
    title:
      fieldDataWorkflowCaseNextProcessNotification
        .workflowCaseNextProcessNotificationId.label,
    dataIndex:
      fieldDataWorkflowCaseNextProcessNotification
        .workflowCaseNextProcessNotificationId.name,
    key: fieldDataWorkflowCaseNextProcessNotification
      .workflowCaseNextProcessNotificationId.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
  {
    title: fieldDataWorkflowCaseNextProcessNotification.createTime.label,
    dataIndex: fieldDataWorkflowCaseNextProcessNotification.createTime.name,
    key: fieldDataWorkflowCaseNextProcessNotification.createTime.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
];

const columnsCaseLatestApprove = [
  {
    title: fieldDataWorkflowCaseLatestApprove.workflowNodeName.label,
    dataIndex: fieldDataWorkflowCaseLatestApprove.workflowNodeName.name,
    key: fieldDataWorkflowCaseLatestApprove.workflowNodeName.name,
  },
  {
    title: fieldDataWorkflowCaseLatestApprove.approveActionNote.label,
    dataIndex: fieldDataWorkflowCaseLatestApprove.approveActionNote.name,
    key: fieldDataWorkflowCaseLatestApprove.approveActionNote.name,
    ellipsis: true,
    align: 'center',
    width: '140px',
  },
  {
    title: fieldDataWorkflowCaseLatestApprove.approveUserRealName.label,
    dataIndex: fieldDataWorkflowCaseLatestApprove.approveUserRealName.name,
    key: fieldDataWorkflowCaseLatestApprove.approveUserRealName.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
  {
    title: fieldDataWorkflowCaseLatestApprove.workflowCaseLatestApproveId.label,
    dataIndex:
      fieldDataWorkflowCaseLatestApprove.workflowCaseLatestApproveId.name,
    key: fieldDataWorkflowCaseLatestApprove.workflowCaseLatestApproveId.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
  {
    title: fieldDataWorkflowCaseLatestApprove.updateTime.label,
    dataIndex: fieldDataWorkflowCaseLatestApprove.updateTime.name,
    key: fieldDataWorkflowCaseLatestApprove.updateTime.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
];

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

function processHistoryItemDataConvert(o) {
  const approveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveWorkflowNodeName.name,
  });

  const approveWorkflowNodeType = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveWorkflowNodeType.name,
    convert: convertCollection.number,
  });

  const approveActionNote = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveActionNote.name,
  });

  const approveActionMode = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveActionMode.name,
  });

  const note = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.note.name,
  });

  const approveUserName = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveUserName.name,
  });

  const time = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.createTime.name,
  });

  if (approveWorkflowNodeType === flowNodeTypeCollection.intermediateNode) {
    return {
      ...o,
      title: approveWorkflowNodeName,
      result: approveActionNote,
      note,
      operatorName: approveUserName,
      time,
    };
  }

  return {
    ...o,
    title: approveWorkflowNodeName,
    result: '',
    note: '',
    operatorName: '',
    time: '',
    compact: approveActionMode === flowApproveActionModeCollection.autoControl,
  };
}

function processHistoryNextDataConvert(o) {
  if (o == null || isEmptyObject(o)) {
    return null;
  }

  const nextApproveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataWorkflowNode.name.name,
  });

  return {
    ...o,
    titlePrefix: '待审批节点',
    title: nextApproveWorkflowNodeName,
    icon: iconBuilder.clock(),
    color: 'blue',
    result: '',
    note: '',
    operatorName: '',
    time: '',
  };
}

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  useFormWrapper = false;

  componentAuthority = accessWayCollection.workflowCase.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowCase/get',
      submitApiPath: 'workflowCase/submitForm',
      workflowCaseId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { workflowCaseId } = this.state;

    d[fieldData.workflowCaseId.name] = workflowCaseId;

    return d;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const {
      workflowFormDesign,
      nextApproveWorkflowNode,
      listFormStorage,
      listAttachment,
      listProcessHistory,
      listNextProcessNotification,
      listLatestApprove,
    } = {
      workflowFormDesign: {},
      nextApproveWorkflowNode: null,
      listFormStorage: [],
      listAttachment: [],
      listProcessHistory: [],
      listNextProcessNotification: [],
      listLatestApprove: [],
      ...metaData,
    };

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

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          fullLine: false,
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div
                  style={{
                    paddingTop: '20px',
                  }}
                >
                  <SchemaDisplayer
                    {...designData}
                    initialValues={initialValues}
                    showSubmit={false}
                    showSubmitDivider={false}
                    submitButtonText="提交表单"
                    descriptionTitleColor={remarkColor}
                    descriptionLabelColor={remarkColor}
                    descriptionTextColor={remarkColor}
                    descriptions={remarkSchemaList}
                    descriptionUpperLabel="附件列表"
                    descriptionUpperComponent={
                      <FileViewer
                        canUpload={false}
                        canRemove={false}
                        list={listAttachment}
                        dataTransfer={(o) => {
                          return {
                            ...o,
                            name: getValueByKey({
                              data: o,
                              key: fieldDataWorkflowCaseFormAttachment.alias
                                .name,
                            }),
                            url: getValueByKey({
                              data: o,
                              key: fieldDataWorkflowCaseFormAttachment.url.name,
                            }),
                          };
                        }}
                        onUploadButtonClick={() => {
                          this.showAddAttachmentModal();
                        }}
                        onItemClick={(o) => {
                          this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
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
              ),
            },
          ],
        },
        {
          title: {
            text: '审批进度',
          },
          fullLine: false,
          width: '320px',
          // 内置 card 变更为 flex 布局，即 card body 占满剩余宽度, 仅在 fullLine 为 false 下生效
          flexVertical: true,
          otherComponent: (
            <FlowProcessHistory
              list={[
                ...(isArray(listProcessHistory) ? listProcessHistory : []),
              ]}
              listItemConvert={processHistoryItemDataConvert}
              nextData={nextApproveWorkflowNode}
              nextDataConvert={processHistoryNextDataConvert}
            />
          ),
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '审批人最后操作列表',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={columnsCaseLatestApprove}
                    size="small"
                    dataSource={listLatestApprove}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </div>
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '审批通知发送列表',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={columnsNextProcessNotification}
                    size="small"
                    dataSource={listNextProcessNotification}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </div>
              ),
            },
          ],
        },
      ],
    };
  };
}

export default BasicInfo;
