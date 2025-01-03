import { Divider, Empty, Table } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { CenterBox, iconBuilder } from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  FileViewer,
  nodeApply,
  nodeAttention,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import { FlowProcessHistory } from 'antd-management-fast-flow';

import {
  accessWayCollection,
  emptySignet,
  fieldDataFlowCaseFormAttachment,
  fieldDataFlowFormDesign,
  flowCaseStatusCollection,
  signetStyle,
} from '../../../../customConfig';
import {
  adjustFlowCaseDataToState,
  buildColumnsCarbonCopyNotification,
  buildColumnsCaseLatestApprove,
  buildColumnsNextProcessApprove,
  buildColumnsNextProcessNotification,
  convertProcessHistoryItemData,
  convertProcessHistoryNextData,
} from '../../../../pageBases';
import { buildFlowCaseFormInitialValues } from '../../../../utils';
import { fieldData as fieldDataWorkflowCaseCarbonCopyNotification } from '../../../WorkflowCaseCarbonCopyNotification/Common/data';
import { fieldData as fieldDataWorkflowCaseFormAttachment } from '../../../WorkflowCaseFormAttachment/Common/data';
import { PreviewDrawer as WorkflowCaseFormAttachmentPreviewDrawer } from '../../../WorkflowCaseFormAttachment/PreviewDrawer';
import { fieldData as fieldDataWorkflowCaseLatestApprove } from '../../../WorkflowCaseLatestApprove/Common/data';
import { fieldData as fieldDataWorkflowCaseNextProcessApprove } from '../../../WorkflowCaseNextProcessApprove/Common/data';
import { fieldData as fieldDataWorkflowCaseNextProcessNotification } from '../../../WorkflowCaseNextProcessNotification/Common/data';
import { WorkflowCaseProcessHistoryPageListDrawer } from '../../../WorkflowCaseProcessHistory/PageListDrawer';
import { fieldData as fieldDataWorkflowFormDesign } from '../../../WorkflowFormDesign/Common/data';
import { FlowCaseFormDocumentDrawer } from '../../../WorkflowFormDesign/FlowCaseFormDocumentDrawer';
import { getChainAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

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
      currentAttachment: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
      listAttachment: [],
      useDocumentDisplay: false,
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

  doOtherRemoteRequest = () => {
    this.loadChainApprove();
  };

  loadChainApprove = () => {
    const { workflowCaseId } = this.state;

    getChainAction({
      target: this,
      handleData: {
        workflowCaseId: workflowCaseId ?? '',
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldData.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: isArray(listChainApprove)
            ? listChainApprove.map((o) => {
                const { name } = { name: '', ...o };

                return {
                  title: name,
                  ...o,
                };
              })
            : [],
        });
      },
    });
  };

  reloadChainApprove = () => {
    this.loadChainApprove();
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
    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldData.listFormStorage.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldData.listAttachment.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const workflowFormDesign = getValueByKey({
      data: metaData,
      key: fieldData.workflowFormDesign.name,
      defaultValue: null,
    });

    const flowCaseStatus = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      defaultValue: {},
    });

    const { nodeList, edgeList, listApprove, listProcessHistory } =
      adjustFlowCaseDataToState(metaData);

    this.setState({
      nodeList: [...nodeList],
      edgeList: [...edgeList],
      useDocumentDisplay: checkInCollection(
        [
          flowCaseStatusCollection.submitApproval,
          flowCaseStatusCollection.inApprovalProcess,
          flowCaseStatusCollection.success,
          flowCaseStatusCollection.refuse,
        ],
        flowCaseStatus,
      ),
      workflowFormDesign,
      listFormStorage: [...listFormStorage],
      listProcessHistory: [...listProcessHistory],
      listAttachment: [...listAttachment],
      listApprove: [...listApprove],
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { workflowCaseId } = this.state;

    d[fieldData.workflowCaseId.name] = workflowCaseId;

    return d;
  };

  getApplicantConfig = () => {
    const { metaData } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.applicantUserSignet.name,
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
          key: fieldData.applicantTime.name,
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
      key: fieldData.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.attentionUserSignet.name,
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
          key: fieldData.attentionTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  showWorkflowCaseFormAttachmentPreviewDrawer = (item) => {
    this.setState(
      {
        currentAttachment: item,
      },
      () => {
        WorkflowCaseFormAttachmentPreviewDrawer.open();
      },
    );
  };

  showWorkflowCaseProcessHistoryPageListDrawer = () => {
    WorkflowCaseProcessHistoryPageListDrawer.open();
  };

  showFlowCaseFormDocumentDrawer = () => {
    FlowCaseFormDocumentDrawer.open();
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

    const {
      nextApproveWorkflowNode,
      listNextProcessNotification,
      listNextProcessApprove,
      listCarbonCopyNotification,
      listLatestApprove,
    } = {
      nextApproveWorkflowNode: null,
      listNextProcessNotification: [],
      listNextProcessApprove: [],
      listCarbonCopyNotification: [],
      listLatestApprove: [],
      ...metaData,
    };

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
                buildType: cardConfig.extraBuildType.generalExtraButton,
                icon: iconBuilder.read(),
                text: '文档模式',
                disabled: useDocumentDisplay,
                handleClick: () => {
                  this.setState({
                    useDocumentDisplay: true,
                  });
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                icon: iconBuilder.form(),
                text: '表单模式',
                disabled: !useDocumentDisplay,
                handleClick: () => {
                  this.setState({
                    useDocumentDisplay: false,
                  });
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.read(),
                text: '表单打印',
                disabled:
                  !firstLoadSuccess ||
                  !checkHasAuthority(
                    accessWayCollection.workflow.get.permission,
                  ),
                handleClick: () => {
                  this.showFlowCaseFormDocumentDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
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
        {
          title: {
            text: '审批进度',
          },
          fullLine: false,
          width: '320px',
          // 内置 card 变更为 flex 布局，即 card body 占满剩余宽度, 仅在 fullLine 为 false 下生效
          flexVertical: true,
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.dropdownEllipsis,
                size: 'small',
                handleMenuClick: ({ key, handleData }) => {
                  switch (key) {
                    case 'showWorkflowCaseProcessHistoryPageListDrawer': {
                      this.showWorkflowCaseProcessHistoryPageListDrawer(
                        handleData,
                      );
                      break;
                    }

                    default: {
                      showSimpleErrorMessage('can not find matched key');
                      break;
                    }
                  }
                },
                handleData: metaData,
                items: [
                  {
                    key: 'showWorkflowCaseProcessHistoryPageListDrawer',
                    icon: iconBuilder.sortDescending(),
                    text: '审批历史列表',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowCaseNextProcessProgress
                        .pageList.permission,
                    ),
                  },
                ],
              },
            ],
          },
          otherComponent: (
            <FlowProcessHistory
              list={[
                ...(isArray(listProcessHistory) ? listProcessHistory : []),
              ]}
              listItemConvert={convertProcessHistoryItemData}
              nextData={nextApproveWorkflowNode}
              nextDataConvert={convertProcessHistoryNextData}
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
                    columns={buildColumnsCaseLatestApprove({
                      flowCaseLatestApproveIdLabel:
                        fieldDataWorkflowCaseLatestApprove
                          .workflowCaseLatestApproveId.label,
                      flowCaseLatestApproveIdName:
                        fieldDataWorkflowCaseLatestApprove
                          .workflowCaseLatestApproveId.name,
                    })}
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
            text: '下一审批预告列表',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '每次审批都会更新此处内容, 重置审批将清空',
                textStyle: {
                  color: '#666',
                },
                iconStyle: {
                  color: '#666',
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={buildColumnsNextProcessApprove({
                      flowCaseNextProcessApproveIdLabel:
                        fieldDataWorkflowCaseNextProcessApprove
                          .workflowCaseNextProcessApproveId.label,
                      flowCaseNextProcessApproveIdName:
                        fieldDataWorkflowCaseNextProcessApprove
                          .workflowCaseNextProcessApproveId.name,
                    })}
                    size="small"
                    dataSource={listNextProcessApprove}
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
                    columns={buildColumnsNextProcessNotification({
                      flowCaseNextProcessNotificationIdLabel:
                        fieldDataWorkflowCaseNextProcessNotification
                          .workflowCaseNextProcessNotificationId.label,
                      flowCaseNextProcessNotificationIdName:
                        fieldDataWorkflowCaseNextProcessNotification
                          .workflowCaseNextProcessNotificationId.name,
                    })}
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
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '抄送通知发送列表',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={buildColumnsCarbonCopyNotification({
                      flowCasCarbonCopyNotificationIdLabel:
                        fieldDataWorkflowCaseCarbonCopyNotification
                          .workflowCaseCarbonCopyNotificationId.label,
                      flowCaseCarbonCopyNotificationIdName:
                        fieldDataWorkflowCaseCarbonCopyNotification
                          .workflowCaseCarbonCopyNotificationId.name,
                    })}
                    size="small"
                    dataSource={listCarbonCopyNotification}
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

  renderFlowCaseFormFieldDisplay = () => {
    const {
      metaData,
      workflowFormDesign,
      listFormStorage,
      listApprove,
      listAttachment,
    } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
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

    const initialValues = buildFlowCaseFormInitialValues(
      listFormStorage,
      dataSchemaList,
    );

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
                    key: fieldDataWorkflowCaseFormAttachment.alias.name,
                  }),
                  url: getValueByKey({
                    data: o,
                    key: fieldDataWorkflowCaseFormAttachment.url.name,
                  }),
                };
              }}
              onItemClick={(o) => {
                this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
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

        {!isArray(listApprove) || isEmptyArray(listApprove) ? null : (
          <Divider>审批信息</Divider>
        )}

        {!isArray(listApprove) || isEmptyArray(listApprove) ? null : (
          <DocumentPrintDesigner
            showToolbar={false}
            canDesign={false}
            showTitle={false}
            showRemark={false}
            approveList={listApprove}
            signetStyle={signetStyle}
            showApply={showApply}
            applyList={listApply}
            showAttention={showAttention}
            attentionList={listAttention}
            showQRCode
            showSerialNumber
            qRCodeImage={qRCodeImage}
            serialNumberTitle="审批流水号: "
            serialNumberContent={workflowCaseId}
          />
        )}
      </div>
    );
  };

  renderFlowCaseFormDocumentDisplay = () => {
    const {
      metaData,
      workflowFormDesign,
      listFormStorage,
      listApprove,
      listChainApprove,
      listAttachment,
    } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
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

    const {
      general,
      title,
      items: itemsSource,
    } = {
      general: {},
      title: {},
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

    let items = [];

    if (
      isArray(itemsSource) &&
      !isEmptyArray(itemsSource) &&
      isArray(listDataSchema)
    ) {
      for (const o of listDataSchema) {
        const { name } = { name: '', ...o };

        if (checkStringIsNullOrWhiteSpace(name)) {
          continue;
        }

        let config = {};

        for (const one of itemsSource) {
          const { name: nameOne } = { name: '', ...one };

          if (nameOne === name) {
            config = one;

            break;
          }
        }

        items.push({ ...config, ...o });
      }
    } else {
      items = listDataSchema;
    }

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

    return (
      <>
        <DocumentPrintDesigner
          canDesign={false}
          showToolbar={false}
          title={getValueByKey({
            data: metaData,
            key: fieldData.workflowName.name,
          })}
          values={isArray(listFormStorage) ? listFormStorage : []}
          schema={{
            general: general || {},
            title: title || {},
            items,
          }}
          formItems={listDataSchema}
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
          remarkTitle="备注"
          remarkName="remark"
          remarkList={remarkSchemaList}
          showQRCode
          showSerialNumber
          qRCodeImage={qRCodeImage}
          serialNumberTitle="审批流水号: "
          serialNumberContent={workflowCaseId}
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
              showSubmit={false}
              showSubmitDivider={false}
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
              onItemClick={(o) => {
                this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
              }}
            />
          </div>
        </CenterBox>
      </>
    );
  };

  renderPresetOther = () => {
    const { metaData, currentAttachment, listApprove, listChainApprove } =
      this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldData.listFormStorage.name,
      convert: convertCollection.array,
    });

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    return (
      <>
        <WorkflowCaseFormAttachmentPreviewDrawer
          maskClosable
          externalData={currentAttachment}
        />

        <WorkflowCaseProcessHistoryPageListDrawer
          maskClosable
          externalData={{
            flowCaseId: getValueByKey({
              data: metaData,
              key: fieldData.workflowCaseId.name,
              defaultValue: '',
            }),
          }}
        />

        <FlowCaseFormDocumentDrawer
          maskClosable
          canDesign={false}
          showToolbar={false}
          showIndependentPrint
          externalData={{
            workflowId: getValueByKey({
              data: metaData,
              key: fieldData.workflowId.name,
              defaultValue: '',
            }),
          }}
          values={listFormStorage}
          showApply={showApply}
          applyList={listApply}
          showAttention={showAttention}
          attentionList={listAttention}
          approveList={listApprove}
          allApproveProcessList={listChainApprove}
          qRCodeImage={qRCodeImage}
          serialNumberContent={workflowCaseId}
        />
      </>
    );
  };
}

export default BasicInfo;