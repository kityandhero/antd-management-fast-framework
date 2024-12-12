import { Empty } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  formatDatetime,
  getNow,
  getValueByKey,
  showSimpleInfoMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import {
  DataDisplayer,
  FileViewer,
  nodeApply,
  nodeAttention,
  SchemaDisplayer,
  setSchemaWithExternalData,
} from 'antd-management-fast-design-playground';

import {
  accessWayCollection,
  emptySignet,
  listSimpleAllApproveProcess,
  listSimpleApprove,
  simpleQRCode,
} from '../../../../customConfig';
import { fieldData as fieldDataWorkflowFormDesign } from '../../../WorkflowFormDesign/Common/data';
import { DesignDrawer } from '../../../WorkflowFormDesign/DesignDrawer';
import { FlowCaseFormDocumentDrawer } from '../../../WorkflowFormDesign/FlowCaseFormDocumentDrawer';
import { RemarkEditDrawer } from '../../../WorkflowFormDesign/RemarkEditDrawer';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  useFormWrapper = false;

  componentAuthority = accessWayCollection.workflow.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      submitApiPath: 'workflowFormDesign/updateBasicInfo',
      workflowId: null,
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
    const { workflowId } = this.state;

    d[fieldData.workflowId.name] = workflowId;

    return d;
  };

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const designJson = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.designSchema.name,
    });

    setSchemaWithExternalData(designJson);
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
      key: fieldData.defaultApplicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.defaultApplicantStatementContent.name,
      convert: convertCollection.string,
    });

    const listApply = [
      {
        ...nodeApply,
        title: applicantStatementTitle,
        note: applicantStatementContent,
        signet: emptySignet,
        time: formatDatetime({
          data: getNow(),
          format: datetimeFormat.yearMonthDayHourMinuteSecond,
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
      key: fieldData.defaultAttentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.defaultAttentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.defaultAttentionUserSignet.name,
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
        time: formatDatetime({
          data: getNow(),
          format: datetimeFormat.yearMonthDayHourMinuteSecond,
        }),
      },
    ];

    return {
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  showDesignDrawer = () => {
    DesignDrawer.open();
  };

  afterDesignDrawerClose = () => {
    this.reloadData({});
  };

  showFlowCaseFormDocumentDrawer = () => {
    FlowCaseFormDocumentDrawer.open();
  };

  afterFlowCaseFormDocumentDrawerClose = () => {
    this.reloadData({});
  };

  showRemarkEditDrawer = () => {
    RemarkEditDrawer.open();
  };

  afterRemarkEditDrawerClose = () => {
    this.reloadData({});
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    const designJson = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.designSchema.name,
    });

    const dataSchemaList = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.dataSchemaList.name,
      convert: convertCollection.array,
    });

    const hasDataSchema = dataSchemaList.length > 0;

    const designData = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(designJson)
        ? {}
        : JSON.parse(designJson)),
    };

    const remarkSchemaList = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.remarkColor.name,
      defaultValue: '',
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '设计预览',
          },
          fullLine: false,
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowFormDesign.updateBasicInfo
                    .permission,
                ),
                icon: iconBuilder.message(),
                type: 'primary',
                text: '表单设计',
                handleClick: () => {
                  this.showDesignDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowFormDesign.updateBasicInfo
                    .permission,
                ),
                icon: iconBuilder.help(),
                type: 'default',
                text: '表单备注',
                handleClick: () => {
                  this.showRemarkEditDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowFormDesign.updateBasicInfo
                    .permission,
                ),
                icon: iconBuilder.read(),
                type: 'default',
                text: '打印设计',
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
              component: (
                <div>
                  <SchemaDisplayer
                    {...designData}
                    helpBoxProps={
                      {
                        // showNumber: false,
                      }
                    }
                    descriptionTitleColor={remarkColor}
                    descriptionLabelColor={remarkColor}
                    descriptionTextColor={remarkColor}
                    descriptions={remarkSchemaList}
                    descriptionUpperLabel="附件列表"
                    descriptionUpperComponent={
                      <FileViewer
                        canUpload
                        canRemove
                        list={[
                          {
                            key: '100',
                            name: '示例文件.doc',
                            link: 'http://file.abc.net/simple.doc',
                          },
                        ]}
                        dataTransfer={(o) => {
                          return {
                            ...o,
                            alias: getValueByKey({
                              data: o,
                              name: '示例文件.doc',
                              key: '',
                            }),
                            url: getValueByKey({
                              data: o,
                              key: 'link',
                            }),
                          };
                        }}
                        onUploadButtonClick={() => {
                          showSimpleInfoMessage('示例: 点击上传按钮');
                        }}
                        onItemClick={() => {
                          showSimpleInfoMessage('示例: 点击条目按钮');
                        }}
                        onRemove={() => {
                          showSimpleInfoMessage('示例: 点击移除按钮');
                        }}
                      />
                    }
                    showSubmit
                    showSubmitDivider
                    submitButtonText="提交表单"
                    buttonAfterSubmitBuilder={() => {
                      return (
                        <>
                          {buildButton({
                            type: 'primary',
                            icon: iconBuilder.checkCircle(),
                            text: '同意审批',
                            handleData: metaData,
                            handleClick: () => {
                              showSimpleInfoMessage('示例: 点击同意审批');
                            },
                          })}

                          {buildButton({
                            type: 'primary',
                            danger: true,
                            icon: iconBuilder.closeCircle(),
                            text: '拒绝审批',
                            handleData: metaData,
                            handleClick: () => {
                              showSimpleInfoMessage('示例: 点击拒绝审批');
                            },
                          })}
                        </>
                      );
                    }}
                    onSubmit={() => {
                      showSimpleInfoMessage('示例: 点击提交按钮');
                    }}
                  >
                    {hasDataSchema ? null : (
                      <Empty description="暂无表单设计，请点击 “表单设计” 按钮进行设计" />
                    )}
                  </SchemaDisplayer>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '数据集合',
          },
          fullLine: false,
          width: '480px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: <DataDisplayer schema={dataSchemaList} />,
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { workflowId } = this.state;

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    return (
      <>
        <DesignDrawer
          externalData={{ workflowId }}
          afterClose={() => {
            this.afterDesignDrawerClose();
          }}
        />

        <FlowCaseFormDocumentDrawer
          maskClosable
          canDesign
          values={[]}
          approveList={listSimpleApprove}
          allApproveProcessList={listSimpleAllApproveProcess}
          showApply={showApply}
          applyList={listApply}
          showAttention={showAttention}
          attentionList={listAttention}
          qRCodeImage={simpleQRCode}
          serialNumberContent={'1836370789809655808'}
          externalData={{ workflowId }}
          afterClose={() => {
            this.afterFlowCaseFormDocumentDrawerClose();
          }}
        />

        <RemarkEditDrawer
          externalData={{ workflowId }}
          afterClose={() => {
            this.afterRemarkEditDrawerClose();
          }}
        />
      </>
    );
  };
}

export default BasicInfo;
