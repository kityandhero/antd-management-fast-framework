import { Empty } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
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
  SchemaDisplayer,
  setSchemaWithExternalData,
} from 'antd-management-fast-design-playground';
import { DataForm } from 'antd-management-fast-framework';

import { saveFormAction } from '../../../businessAssists/action';
import { FlowCaseFormDocumentDrawer } from '../../../businessComponents/Drawers/FlowCaseFormDocumentDrawer';
import { PlaygroundDrawer } from '../../../businessComponents/Drawers/PlaygroundDrawer';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeModalView } from './codeSource';

const { BaseUpdateForm } = DataForm;

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
                text: '表单文档',
                // disabled: !firstLoadSuccess,
                handleClick: () => {
                  this.showFlowCaseFormDocumentDrawer();
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
                    descriptions={[
                      {
                        text: '说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1说明文本1',
                      },
                      {
                        text: '说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2说明文本2',
                      },
                      {
                        text: '说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3说明文本3',
                      },
                    ]}
                    showFooterDivider
                    footer={<div>123123</div>}
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
      </>
    );
  };
}

export default DesignView;
