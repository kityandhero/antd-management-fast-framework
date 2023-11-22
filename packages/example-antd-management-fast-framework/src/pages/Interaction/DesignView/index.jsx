import { Empty } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  CenterBox,
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataDisplayer,
  FileViewer,
  SchemaDisplayer,
  setSchemaWithExternalData,
} from 'antd-management-fast-design-playground';
import { DataForm } from 'antd-management-fast-framework';

import { saveFormAction } from '../../../businessAssists/action';
import { FlowCaseFormDocumentDrawer } from '../../../businessComponents/Drawers/FlowCaseFormDocumentDrawer';
import { PlaygroundDrawer } from '../../../businessComponents/Drawers/PlaygroundDrawer';
import { RemarkEditDrawer } from '../../../businessComponents/Drawers/RemarkEditDrawer';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeModalView } from './codeSource';

const { BaseUpdateForm } = DataForm;

const listAttachment = [
  {
    workflowId: '1720257724563984384',
    flowCaseId: '1721891698650517504',
    tag: 'abdb2869310d4e31ad77a1671909454f',
    name: '1724402689661603840.png',
    alias: '文件1.png',
    size: 405.9541,
    suffix: 'png',
    workflowCaseFormAttachmentId: '1724402698385756160',
    channel: 200,
    status: 100,
    createOperatorId: '1718800099049607168',
    createTime: '2023-11-14 20:23:35',
    updateOperatorId: '1718800099049607168',
    updateTime: '2023-11-14 20:23:35',
    key: '1724402698385756160',
    workflowName: '员工请假审批流程',
    url: 'http://file.abc.net/simple.png',
    statusNote: '正常',
  },
];

@connect(({ formDesign, schedulingControl }) => ({
  formDesign,
  schedulingControl,
}))
class DesignView extends BaseUpdateForm {
  resetDataAfterLoad = false;

  useFormWrapper = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'formDesign/get',
      pageTitle: 'Modal 交互示例',
      currentCodeTitle: 'ModalView',
      currentCode: codeModalView,
      formData: null,
    };
  }

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const designJson = getValueByKey({
      data: metaData,
      key: 'designSchema',
    });

    const formData = getValueByKey({
      data: metaData,
      key: 'formData',
    });

    setSchemaWithExternalData(designJson);

    this.setState({ formData });
  };

  saveForm = (data) => {
    saveFormAction({
      target: this,
      handleData: data,
      successCallback: ({ params }) => {
        this.setState({ formData: params });
      },
    });
  };

  showFlowCaseFormDocumentDrawer = () => {
    FlowCaseFormDocumentDrawer.open();
  };

  afterDesignDrawerClose = () => {
    this.reloadData({});
  };

  showRemarkEditDrawer = () => {
    RemarkEditDrawer.open();
  };

  afterRemarkEditDrawerClose = () => {
    this.reloadData({});
  };

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '操作栏',
      tools: [
        {
          component: buildButton({
            title: '点击显示 PlaygroundModalExtra',
            text: '显示 PlaygroundModalExtra',
            handleClick: () => {
              PlaygroundDrawer.open();
            },
            disabled: false,
          }),
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const {
      // firstLoadSuccess,
      currentCode,
      currentCodeTitle,
      metaData,
      formData,
    } = this.state;

    const that = this;

    const formRemarkList = getValueByKey({
      data: metaData,
      key: 'formRemarkList',
      convert: convertCollection.array,
    });

    const formRemarkColor = getValueByKey({
      data: metaData,
      key: 'formRemarkColor',
      defaultValue: '',
    });

    const designJson = getValueByKey({
      data: metaData,
      key: 'designSchema',
    });

    const dataSchema = getValueByKey({
      data: metaData,
      key: 'dataSchema',
      defaultValue: '[]',
    });

    let listDataSchema = JSON.parse(dataSchema);

    const hasDataSchema = listDataSchema.length > 0;

    const designData = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(designJson)
        ? {}
        : JSON.parse(designJson)),
    };

    return {
      list: [
        {
          title: {
            text: '表单示例',
          },
          fullLine: false,
          width: 'auto',
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.read(),
                text: '表单打印设计',
                // disabled: !firstLoadSuccess,
                handleClick: () => {
                  this.showFlowCaseFormDocumentDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.read(),
                text: '表单备注设置',
                // disabled: !firstLoadSuccess,
                handleClick: () => {
                  this.showRemarkEditDrawer();
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
                  <SchemaDisplayer
                    {...designData}
                    initialValues={formData}
                    showSubmit
                    showSubmitDivider
                    header={
                      <div>
                        <CenterBox>
                          <h2>表单头部区域</h2>
                        </CenterBox>
                      </div>
                    }
                    buttonBeforeSubmitBuilder={() => {
                      return buildButton({
                        type: 'primary',
                        icon: iconBuilder.checkCircle(),
                        text: '其他前置按钮',
                        hidden: false,
                        handleData: metaData,
                        handleClick: ({ handleData }) => {
                          console.log(handleData);
                        },
                      });
                    }}
                    buttonAfterSubmitBuilder={() => {
                      return buildButton({
                        icon: iconBuilder.checkCircle(),
                        text: '其他后置按钮',
                        hidden: false,
                        handleData: metaData,
                        handleClick: ({ handleData }) => {
                          console.log(handleData);
                        },
                      });
                    }}
                    helpBoxProps={
                      {
                        // showNumber: false,
                      }
                    }
                    descriptionTitleColor={formRemarkColor}
                    descriptionLabelColor={formRemarkColor}
                    descriptionTextColor={formRemarkColor}
                    descriptions={formRemarkList}
                    showFooterDivider
                    footer={
                      <FileViewer
                        canUpload
                        canRemove
                        list={listAttachment}
                        dataTransfer={(o) => {
                          return {
                            ...o,
                            name: getValueByKey({
                              data: o,
                              key: 'alias',
                            }),
                            url: getValueByKey({
                              data: o,
                              key: 'url',
                            }),
                          };
                        }}
                        onUploadButtonClick={() => {
                          showSimpleInfoMessage('点击上传按钮');
                        }}
                        onItemClick={() => {
                          showSimpleInfoMessage('点击条目按钮');
                        }}
                        onRemove={() => {
                          showSimpleInfoMessage('点击移除按钮');
                        }}
                      />
                    }
                    onSubmit={(o) => {
                      this.saveForm(o);
                    }}
                  >
                    {hasDataSchema ? null : (
                      <Empty description="暂无表单设计，请进行设计" />
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
          width: '400px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: <DataDisplayer schema={listDataSchema} />,
            },
          ],
        },
        {
          title: {
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                label: '显示源代码',
                size: 'small',
                defaultValue: 'ModalView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'ModalView',
                    name: 'ModalView',
                  },
                  {
                    flag: 'PlaygroundModalExtra',
                    name: 'PlaygroundModalExtra',
                  },
                ],
                dataConvert: convertOptionOrRadioData,
                onChange: (v) => {
                  let code = '';

                  switch (v) {
                    case 'BaseView': {
                      code = codeBaseView;

                      break;
                    }

                    case 'ModalView': {
                      code = codeModalView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(`当前显示 ${v} 源代码`);
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: currentCode,
              language: 'js',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    return (
      <>
        <PlaygroundDrawer
          afterClose={() => {
            this.afterDesignDrawerClose();
          }}
        />

        <FlowCaseFormDocumentDrawer maskClosable />

        <RemarkEditDrawer
          afterClose={() => {
            this.afterRemarkEditDrawerClose();
          }}
        />
      </>
    );
  };
}

export default DesignView;
