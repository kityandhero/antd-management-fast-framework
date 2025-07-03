/* eslint-disable no-unused-vars */
import { Divider, Empty, Space } from 'antd';

import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  formatCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  drawerConfig,
  extraBuildType,
} from 'antd-management-fast-common';
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
  nodeApply,
  nodeAttention,
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
import { buildFlowCaseFormInitialValues } from '../../../utils';

const { BaseUpdateDrawer } = DataDrawer;

function processHistoryItemDataConvert(o) {
  const approveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName.name,
  });

  const approveWorkflowNodeType = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveWorkflowNodeType.name,
    convert: convertCollection.number,
  });

  const approveActionNote = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveActionNote.name,
  });

  const approveActionMode = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveActionMode.name,
  });

  const note = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.note.name,
  });

  const approveUserName = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveUserName.name,
  });

  const time = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.createTime.name,
  });

  if (approveWorkflowNodeType === flowNodeTypeCollection.intermediateNode) {
    return {
      ...o,
      title: approveWorkflowNodeName,
      result: approveActionNote,
      note: note || '未填写',
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
    key: fieldDataFlowNode.name.name,
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

let temporaryFormValues = {};

class BaseFlowCaseFormInfoDrawer extends BaseUpdateDrawer {
  useFormWrapper = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 1024,
      pageTitle: '审批表信息',
      loadApiPath: '',
      submitApiPath: '',
      currentAttachment: null,
      listApprove: [],
      listChainApprove: [],
      listAttachment: [],
      listProcessHistory: [],
      listFormStorage: [],
      useDocumentDisplay: false,
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

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  loadChainApprove = () => {};

  reloadChainApprove = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      currentAttachment: null,
      listApprove: [],
      listChainApprove: [],
      listAttachment: [],
      listProcessHistory: [],
      listFormStorage: [],
      useDocumentDisplay: false,
    });
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    // const canEdit = getValueByKey({
    //   data: metaData,
    //   key: fieldData.canEdit.name,
    //   convert: convertCollection.number,
    // });

    const approveBatchNumber = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.approveBatchNumber.name,
      defaultValue: 0,
      convert: convertCollection.number,
    });

    const flowCaseStatus = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      defaultValue: {},
    });

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listAttachment.name,
      convert: convertCollection.array,
    });

    const listProcessHistory = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listProcessHistory.name,
      convert: convertCollection.array,
    });

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listFormStorage.name,
      convert: convertCollection.array,
    });

    const listApprove = filter(listProcessHistory, (one) => {
      const {
        approveActionMode,
        approveBatchNumber: processHistoryApproveBatchNumber,
      } = {
        approveActionMode: 0,
        approveBatchNumber: 0,
        ...one,
      };

      return (
        approveActionMode === flowApproveActionModeCollection.manualControl &&
        processHistoryApproveBatchNumber === approveBatchNumber
      );
    }).map((o) => {
      const {
        note,
        approveWorkflowNodeName,
        approveUserName,
        approveUserSignet,
        createTime,
      } = {
        approveWorkflowNodeName: '',
        note: '',
        approveUserName: '张三',
        approveUserSignet: '',
        createTime: '',
        ...o,
      };

      return {
        ...o,
        title: approveWorkflowNodeName,
        note: note || '未填写',
        name: approveUserName,
        signet: approveUserSignet || emptySignet,
        time: createTime,
      };
    });

    this.setState({
      useDocumentDisplay:
        // canEdit === whetherNumber.yes ||
        checkInCollection(
          [
            flowCaseStatusCollection.submitApproval,
            flowCaseStatusCollection.inApprovalProcess,
            flowCaseStatusCollection.success,
            // flowCaseStatusCollection.refuse,
          ],
          flowCaseStatus,
        ),
      listApprove: [...listApprove],
      listAttachment: [...listAttachment],
      listProcessHistory: [...listProcessHistory],
      listFormStorage: [...listFormStorage],
    });
  };

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

  saveForm = (o) => {
    const that = this;

    that.execSubmitApi({
      values: o,
      successCallback: () => {
        that.reloadChainApprove();
        that.reloadData({});
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  submitApproval = (o, formValue) => {
    throw new Error('submitApproval need overrode to implement');
  };

  cancelApprove = (o) => {
    throw new Error('cancelApprove need overrode to implement');
  };

  checkHasSubmitFormAuthority = () => {
    throw new Error('checkHasSubmitFormAuthority need overrode to implement');
  };

  checkHasSubmitApprovalAuthority = () => {
    throw new Error(
      'checkHasSubmitApprovalAuthority need overrode to implement',
    );
  };

  checkHasRefuseAuthority = () => {
    throw new Error('checkHasRefuseAuthority need overrode to implement');
  };

  checkHasPassAuthority = () => {
    throw new Error('checkHasPassAuthority need overrode to implement');
  };

  getApplicantConfig = () => {
    const { metaData } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantUserSignet.name,
      convert: convertCollection.string,
    });

    const listApply = [
      {
        ...nodeApply,
        title: applicantStatementTitle,
        note: applicantStatementContent,
        ...(checkStringIsNullOrWhiteSpace(applicantUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: applicantUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldDataFlowCase.applicantTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showApply: applicantSignSwitch === whetherNumber.yes,
      listApply,
    };
  };

  getAttentionConfig = () => {
    const { metaData } = this.state;

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionUserSignet.name,
      convert: convertCollection.string,
    });

    const listAttention = [
      {
        ...nodeAttention,
        title: attentionStatementTitle,
        note: attentionStatementContent,
        ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: attentionUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldDataFlowCase.attentionTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  getItems = () => {
    const { workflowFormDesign } = this.state;

    const documentSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { items: itemsSource } = {
      items: [],
      ...documentSchema,
    };

    const dataSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.dataSchema.name,
      defaultValue: '[]',
    });

    let listDataSchema = [];

    try {
      listDataSchema = JSON.parse(dataSchema);
    } catch (error) {
      logException(error);
    }

    return { items: itemsSource, formItems: listDataSchema };
  };

  openFlowCaseFormAttachmentPreviewDrawer = () => {
    throw new Error(
      'openFlowCaseFormAttachmentPreviewDrawer need overrode to implement',
    );
  };

  showWorkflowCaseFormAttachmentPreviewDrawer = (item) => {
    const that = this;

    that.setState(
      {
        currentAttachment: item,
      },
      () => {
        that.openFlowCaseFormAttachmentPreviewDrawer();
      },
    );
  };

  openPassModal = () => {
    throw new Error('openPassModal need overrode to implement');
  };

  showPassModal = () => {
    this.openPassModal();
  };

  afterPassModalOK = () => {
    this.reloadData({});
  };

  openRefuseModal = () => {
    throw new Error('openRefuseModal need overrode to implement');
  };

  showRefuseModal = () => {
    this.openRefuseModal();
  };

  afterRefuseModalOK = () => {
    this.reloadData({});
  };

  openFlowDisplayDrawer = () => {
    throw new Error('openFlowDisplayDrawer need overrode to implement');
  };

  showFlowDisplayDrawer = () => {
    this.openFlowDisplayDrawer();
  };

  openAddAttachmentModal = () => {
    throw new Error('openAddAttachmentModal need overrode to implement');
  };

  showAddAttachmentModal = () => {
    this.openAddAttachmentModal();
  };

  afterAddAttachmentModalClose = () => {
    this.saveForm(temporaryFormValues);
  };

  openFlowCaseFormDocumentDrawer = () => {
    throw new Error(
      'openFlowCaseFormDocumentDrawer need overrode to implement',
    );
  };

  showFlowCaseFormDocumentDrawer = () => {
    this.openFlowCaseFormDocumentDrawer();
  };

  establishExtraActionConfig = () => {
    const {
      firstLoadSuccess,
      useDocumentDisplay,
      metaData,
      listProcessHistory,
    } = this.state;

    const that = this;

    const status = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    return {
      list: [
        {
          buildType: cardConfig.extraBuildType.generalExtraButton,
          icon: iconBuilder.form(),
          text: '编辑表单',
          disabled: !useDocumentDisplay,
          hidden: !checkInCollection(
            [flowCaseStatusCollection.created, flowCaseStatusCollection.refuse],
            status,
          ),
          handleClick: () => {
            this.setState({
              useDocumentDisplay: false,
            });
          },
        },
        {
          buildType: cardConfig.extraBuildType.generalExtraButton,
          icon: iconBuilder.read(),
          text: '文档预览',
          disabled: useDocumentDisplay,
          hidden: !checkInCollection(
            [flowCaseStatusCollection.created, flowCaseStatusCollection.refuse],
            status,
          ),
          handleClick: () => {
            this.setState({
              useDocumentDisplay: true,
            });
          },
        },
        {
          buildType: cardConfig.extraBuildType.divider,
          hidden: status != flowCaseStatusCollection.created,
        },
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'dashed',
          icon: iconBuilder.fork(),
          text: '流程图例',
          disabled:
            !firstLoadSuccess ||
            !checkHasAuthority(accessWayCollection.workflowCase.get.permission),
          handleClick: () => {
            that.showFlowDisplayDrawer();
          },
        },
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'dashed',
          icon: iconBuilder.printer(),
          text: '表单打印',
          disabled:
            !firstLoadSuccess ||
            !checkHasAuthority(accessWayCollection.workflowCase.get.permission),
          handleClick: () => {
            that.showFlowCaseFormDocumentDrawer();
          },
        },
      ],
    };
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
    const {
      firstLoadSuccess,
      useDocumentDisplay,
      metaData,
      listProcessHistory,
    } = this.state;

    const { nextApproveWorkflowNode } = {
      nextApproveWorkflowNode: null,
      ...metaData,
    };

    const status = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: useDocumentDisplay
                ? this.renderFlowCaseFormDocumentDisplay()
                : this.renderFlowCaseFormFieldDisplay(),
            },
          ],
        },
      ],
    };
  };

  buildBottomBarInnerDefaultConfigList = () => {
    const {
      externalData,
      firstLoadSuccess,
      metaData,
      listApprove,
      listAttachment,
      listFormStorage,
    } = this.state;

    const { latestApproveWorkflowNodeType, workflowFormDesign } = {
      latestApproveWorkflowNodeType: 0,
      workflowFormDesign: {},
      nextApproveWorkflowNode: null,
      ...metaData,
    };

    const status = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canEdit.name,
      convert: convertCollection.number,
    });

    const canApprove = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canApprove.name,
      convert: convertCollection.number,
    });

    return [
      {
        buildType: drawerConfig.bottomBarBuildType.button,
        style: { background: '#2da44e', color: '#fff' },
        icon: iconBuilder.save(),
        text: '保存表单',
        handleData: metaData,
        hidden: !firstLoadSuccess || !canEdit,
        disabled: !this.checkHasSubmitFormAuthority(),
        handleClick: ({ handleData }) => {
          this.saveForm(handleData);
        },
      },
      {
        buildType: drawerConfig.bottomBarBuildType.button,
        style: { background: '#2da44e', color: '#fff' },
        icon: iconBuilder.clock(),
        text: '提交审批',
        title:
          '即将提交审批, 提交前请确保表单已经保存，提交后资料不可更改，确定提交吗?',
        confirm: true,
        handleData: metaData,
        hidden: !firstLoadSuccess || !canEdit,
        disabled: !this.checkHasSubmitApprovalAuthority(),
        handleClick: ({ handleData }) => {
          this.submitApproval(handleData);
        },
      },
      {
        buildType: drawerConfig.bottomBarBuildType.button,
        type: 'primary',
        danger: true,
        icon: iconBuilder.closeCircle(),
        text: '拒绝审批',
        hidden:
          !firstLoadSuccess ||
          !canApprove ||
          latestApproveWorkflowNodeType === flowNodeTypeCollection.endNode,
        disabled: !this.checkHasRefuseAuthority(),
        handleData: metaData,
        handleClick: () => {
          this.showRefuseModal();
        },
      },
      {
        buildType: drawerConfig.bottomBarBuildType.button,
        type: 'primary',
        icon: iconBuilder.checkCircle(),
        text: '同意审批',
        hidden:
          !firstLoadSuccess ||
          !checkHasAuthority(
            accessWayCollection.workflowCaseProcessHistory.pass.permission,
          ) ||
          !canApprove ||
          latestApproveWorkflowNodeType === flowNodeTypeCollection.endNode,
        disabled: !this.checkHasPassAuthority(),
        handleData: metaData,
        handleClick: () => {
          this.showPassModal();
        },
      },
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };

  renderFlowCaseFormFieldDisplay = () => {
    const {
      externalData,
      firstLoadSuccess,
      metaData,
      listApprove,
      listAttachment,
      listFormStorage,
    } = this.state;

    const flowCaseId = this.getFlowCaseId(externalData);

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const { latestApproveWorkflowNodeType, workflowFormDesign } = {
      latestApproveWorkflowNodeType: 0,
      workflowFormDesign: {},
      nextApproveWorkflowNode: null,
      ...metaData,
    };

    const status = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canEdit.name,
      convert: convertCollection.number,
    });

    const canApprove = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canApprove.name,
      convert: convertCollection.number,
    });

    const designJson = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.designSchema.name,
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
      key: fieldDataFlowFormDesign.dataSchemaList.name,
      convert: convertCollection.array,
    });

    const hasDataSchema = dataSchemaList.length > 0;

    const initialValues = buildFlowCaseFormInitialValues(listFormStorage);

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkColor.name,
      defaultValue: '',
    });

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        <SchemaDisplayer
          {...designData}
          initialValues={initialValues}
          descriptionTitleColor={remarkColor}
          descriptionLabelColor={remarkColor}
          descriptionTextColor={remarkColor}
          descriptions={remarkSchemaList}
          descriptionUpperLabel="附件列表"
          descriptionUpperComponentBuilder={({ getFormValue }) => {
            return (
              <FileViewer
                canUpload={canEdit === whetherNumber.yes}
                canRemove={canEdit === whetherNumber.yes}
                list={listAttachment}
                dataTransfer={(o) => {
                  return {
                    ...o,
                    name: getValueByKey({
                      data: o,
                      key: fieldDataFlowCaseFormAttachment.alias.name,
                    }),
                    url: getValueByKey({
                      data: o,
                      key: fieldDataFlowCaseFormAttachment.url.name,
                    }),
                  };
                }}
                nameRender={(v) => {
                  console.log(11_212_121);

                  return (
                    <ColorText
                      textPrefix={v}
                      separator=""
                      text={'【已加密】'}
                      color={'green'}
                    />
                  );
                }}
                onUploadButtonClick={() => {
                  temporaryFormValues = getFormValue();

                  this.showAddAttachmentModal();
                }}
                onItemClick={(o) => {
                  this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
                }}
                onRemove={(o) => {
                  temporaryFormValues = getFormValue();

                  this.removeAttachment(o);
                }}
              />
            );
          }}
          onSubmit={(o) => {
            this.saveForm(o);
          }}
        >
          {hasDataSchema ? null : (
            <Empty description="暂无表单设计，请首先进行设计" />
          )}
        </SchemaDisplayer>

        {!checkInCollection(
          [
            flowCaseStatusCollection.submitApproval,
            flowCaseStatusCollection.inApprovalProcess,
            flowCaseStatusCollection.success,
          ],
          status,
        ) ||
        !isArray(listApprove) ||
        isEmptyArray(listApprove) ? null : (
          <Divider>以下为环节审批信息</Divider>
        )}

        {!checkInCollection(
          [
            flowCaseStatusCollection.submitApproval,
            flowCaseStatusCollection.inApprovalProcess,
            flowCaseStatusCollection.success,
          ],
          status,
        ) ||
        !isArray(listApprove) ||
        isEmptyArray(listApprove) ? null : (
          <DocumentPrintDesigner
            approveList={listApprove}
            signetStyle={signetStyle}
            showApply={showApply}
            applyList={listApply}
            showAttention={showAttention}
            attentionList={listAttention}
            qRCodeImage={qRCodeImage}
            serialNumberTitle="审批流水号: "
            serialNumberContent={flowCaseId}
          />
        )}
      </div>
    );
  };

  renderFlowCaseFormDocumentDisplay = () => {
    const {
      externalData,
      firstLoadSuccess,
      metaData,
      listApprove,
      listAttachment,
      listChainApprove,
      listFormStorage,
    } = this.state;

    const flowCaseId = this.getFlowCaseId(externalData);

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const { latestApproveWorkflowNodeType, workflowFormDesign } = {
      latestApproveWorkflowNodeType: 0,
      workflowFormDesign: {},
      ...metaData,
    };

    const status = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canEdit.name,
      convert: convertCollection.number,
    });

    const canApprove = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canApprove.name,
      convert: convertCollection.number,
    });

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const documentSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { general, title } = {
      general: {},
      title: {},
      ...documentSchema,
    };

    const listChainApproveAdjust = isArray(listChainApprove)
      ? listChainApprove.map((o) => {
          const { name } = { name: '', ...o };

          return {
            title: name,
            ...o,
          };
        })
      : [];

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    const { items, formItems } = this.getItems();

    return (
      <>
        <DocumentPrintDesigner
          canDesign={false}
          showToolbar={false}
          title={getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.workflowTitle.name,
          })}
          values={isArray(listFormStorage) ? listFormStorage : []}
          schema={{
            general: general || {},
            title: title || {},
            items,
          }}
          formItems={formItems}
          approveList={isArray(listApprove) ? listApprove : []}
          allApproveProcessList={listChainApproveAdjust}
          signetStyle={signetStyle}
          showApply={showApply}
          applyList={listApply}
          showAttention={showAttention}
          attentionList={listAttention}
          showRemark={
            !(!isArray(remarkSchemaList) || isEmptyArray(remarkSchemaList))
          }
          remarkList={remarkSchemaList}
          qRCodeImage={qRCodeImage}
          serialNumberTitle="审批流水号: "
          serialNumberContent={flowCaseId}
        />

        <CenterBox>
          <div
            style={{
              paddingTop: '10px',
              paddingLeft: '60px',
              paddingRight: '60px',
              width: '920px',
            }}
          >
            <FileViewer
              canUpload={canEdit === whetherNumber.yes}
              canRemove={canEdit === whetherNumber.yes}
              list={listAttachment}
              dataTransfer={(o) => {
                return {
                  ...o,
                  name: getValueByKey({
                    data: o,
                    key: fieldDataFlowCaseFormAttachment.alias.name,
                  }),
                  url: getValueByKey({
                    data: o,
                    key: fieldDataFlowCaseFormAttachment.url.name,
                  }),
                };
              }}
              nameRender={(v) => {
                console.log(11_212_121);

                return (
                  <ColorText
                    textPrefix={v}
                    separator=""
                    text={'【已加密】'}
                    color={'green'}
                  />
                );
              }}
              onItemClick={(o) => {
                this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
              }}
            />
          </div>
        </CenterBox>

        {status === flowCaseStatusCollection.created ? (
          <CenterBox>
            <div
              style={{
                paddingTop: '10px',
                paddingLeft: '60px',
                paddingRight: '60px',
                width: '920px',
              }}
            >
              <HelpBox
                border={false}
                title="说明"
                list={[
                  {
                    text: '预览模式下信息不可编辑, 如需编辑, 请切换到 “表单编辑” 模式。',
                  },
                ]}
              />
            </div>
          </CenterBox>
        ) : null}
      </>
    );
  };
}

export {
  BaseFlowCaseFormInfoDrawer,
  processHistoryItemDataConvert,
  processHistoryNextDataConvert,
};
