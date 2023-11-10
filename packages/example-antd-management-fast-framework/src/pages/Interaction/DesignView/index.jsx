import { Empty } from 'antd';

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
  convertOptionOrRadioData,
} from 'antd-management-fast-component';
import {
  DataDisplayer,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';

import { PlaygroundDrawer } from '../../../businessComponents/Drawers/PlaygroundDrawer';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeModalView } from './codeSource';

@connect(({ formDesign, schedulingControl }) => ({
  formDesign,
  schedulingControl,
}))
class ModalView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'formDesign/get',
      pageTitle: 'Modal 交互示例',
      currentCodeTitle: 'ModalView',
      currentCode: codeModalView,
    };
  }

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
    const { currentCode, currentCodeTitle, metaData } = this.state;

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
        [
          {
            title: {
              text: '表单示例',
            },
            width: 'auto',
            items: [
              {
                lg: 24,
                type: cardConfig.contentItemType.component,
                component: (
                  <div>
                    <SchemaDisplayer {...designData}>
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
            width: '400px',
            items: [
              {
                lg: 24,
                type: cardConfig.contentItemType.component,
                component: <DataDisplayer schema={listDataSchema} />,
              },
            ],
          },
        ],
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
      </>
    );
  };
}

export default ModalView;
